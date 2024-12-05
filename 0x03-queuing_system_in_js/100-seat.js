import redis from 'redis';
import { promisify } from 'util'
import kue from 'kue';
import express from 'express';

const queue = kue.createQueue();
const redisClient = redis.createClient();
const app = express();
const port = 1245;
const hostitemName = '127.0.0.1';

let reservationEnabled = true;

function reserveSeat(number) {
    redisClient.set('available_seats', number, redis.print);
}

const getAsync = promisify(redisClient.get).bind(redisClient);

async function getCurrentAvailableSeats() {
    try {
        const result = await getAsync('available_seats');
	return result;
    } catch(err) {
        console.log(err);
    }
}

reserveSeat(50); // sets the default number of available seats to 50

app.get('/available_seats', async (req, res) => {
    try {
	const available_seat = await getCurrentAvailableSeats();
	res.json({ numberOfAvailableSeats: available_seat });
    } catch(err) {
	console.log(err);
	 return;
    }
});

app.get('/reserve_seat', (req, res) => {
    if (!reservationEnabled) {
        res.json( { "status": "Reservation are blocked" });
        return;
    }

    const job = queue.create('reserve_seat')
    .save((err) => {
        if (err) {
            res.json('{ "status": "Reservation failed" }')
            return;
        }
        res.json({ "status": "Reservation in process" })
    });

    job.on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`);
    });

    job.on('failed', (err) => {
        console.log(`Seat reservation job ${job.id} failed: ${err}`);
    });
});

app.get('/process', (req, res) => {
    queue.process('reserve_seat', async (job, done) => {
        const available_seat = await getCurrentAvailableSeats();
        if ((available_seat - 1) === 0) {
            reservationEnabled = false;
        }

        if ((available_seat - 1 ) < 0) {
            done(new Error('Not enough seats available'));
        }

        reserveSeat(available_seat - 1);
        done();
    })
    res.json( { "status": "Queue processing" });
});

app.listen(port, () => {
    console.log(`Server running at http://${hostitemName}:${port}/`);
});

redisClient.on('connect', () => {
	console.log('Redis client connected to the server');
});

redisClient.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});
