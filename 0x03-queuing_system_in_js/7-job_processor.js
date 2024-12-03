import kue from 'kue';

const queue = kue.createQueue();

const blacklistedNumbers = ['4153518780', '4153518781'];

const sendNotification = function(phoneNumber, message, job, done) {
    job.progress(0, 100);
    if (blacklistedNumbers.includes(phoneNumber)) {
	done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }
    // Simulate asynchronous operation
    setTimeout(() => {
        job.progress(50, 100);
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
	done();
    }, 1000); // 1 sec
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message, } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
