import { describe, it } from 'moncha';
import kue from 'kue';
import createPushNotificationsJobs from './8-job'
import chai from 'chai'

const { expect } = chai;

const sinon = require('sinon');

let queue;

describe("createPushNotificationsJobs", () => {
    beforeEach(() => {
        queue = kue.createQueue();
        queue.testMode = true;
    });

    afterEach(() => {
        queue.testMode = false;
        queue.shutdown(500, (err) => {
            if (err) {
                console.log(err);
            }
        })
    });

    it("display a error message if jobs is not an array", function() {
        expect(createPushNotificationsJobs({}, queue)).to.throw(Error, 'Jobs is not an array');
    });

    it("create two new jobs to the queue", function(done) {
        const jobs = [
            { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
            { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' }
        ];

        createPushNotificationsJobs(jobs, queue);

        queue.on('complete', () => {
            expect(queue.jobs.length).to.equal(2);
            done();
        });
    });
})