import redis from 'redis';

const client = redis.createClient()

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});

client.hset(
	'HolbertonSchools',
	'Portland'=50,
	'Seattle'=80,
	'New York'=20,
	'Bogota'=20,
	'Cali'=40,
	'Paris'=40,
	redis.print);

client.hgetall('HolbertonSchools', (err, reply) => {
	if (err) {
		console.log(err);
		return;
	};
	console.log(reply);
});