import { describe, it } from 'mocha';
import kue from 'kue';
import createPushNotificationsJobs from './8-job'
import chai from 'chai'

const { expect } = chai;

const sinon = require('sinon');

let queue;

describe("createPushNotificationsJobs", function() {
    before(() => {
        queue = kue.createQueue();
        queue.testMode.enter(true);
    });

    after(() => {
        queue.testMode.clear();
	queue.testMode.exit();
    });

    it("display a error message if jobs is not an array", function() {
        expect(createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, queue)).to.throw(Error, 'Jobs is not an array');
    });

    it("create two new jobs to the queue", function(done) {
        const jobs = [
            { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
            { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' }
        ];

        createPushNotificationsJobs(jobs, queue);
	expect(queue.testMode.jobs.length).to.be.equal(2);
    });
})
