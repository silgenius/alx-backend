# ALX Backend - 0x03: Queuing System in JS

This repository is part of the ALX Backend program, focused on learning and implementing various backend systems. The directory `0x03-queuing_system_in_js` contains solutions and projects related to building a queuing system using JavaScript.

## Project Overview

In this project, we will build a queuing system in JavaScript. The objective is to simulate a queue, which is a data structure where elements are added to the back and removed from the front (FIFO – First In, First Out). This system will be implemented using classes and methods in JavaScript, and will aim to handle asynchronous tasks in a structured manner.

### Key Concepts
- **Queues:** The data structure that follows the FIFO principle.
- **Asynchronous Programming in JavaScript:** How to manage tasks in a non-blocking manner.
- **Event-Driven Programming:** Handling events like adding or removing tasks from a queue.
  
## Project Requirements

- **JavaScript Basics**: Knowledge of JavaScript syntax, functions, and classes.
- **Async Programming**: Understanding of promises, async/await, and setTimeout.
- **Data Structures**: Familiarity with the implementation of queues and understanding how they work.
- **Node.js**: Usage of Node.js for implementing the queuing system and running JavaScript code.

## Files in the `0x03-queuing_system_in_js` Directory

This directory contains the following files:

1. **Queue.js**: 
   - Contains the definition of the `Queue` class. This class has methods for enqueueing and dequeueing elements, as well as other utility methods like checking if the queue is empty.

2. **task.js**: 
   - Implements tasks that will be queued. This can include functions, timeouts, and task handlers.
   
3. **main.js**:
   - Provides an example of how the queue is used to manage tasks and process them asynchronously.

## How to Run

To run the project, ensure you have **Node.js** installed on your machine. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/alx-backend.git
   cd alx-backend/0x03-queuing_system_in_js
    ```

2. Run the JavaScript files:

    ```bash
    node Queue.js
    node task.js
    node main.js
    ```

3.The program will output logs showing how tasks are added to the queue and processed asynchronously.

### Example Usage

    ```javascript
    const Queue = require('./Queue');
    const task = require('./task');

    // Create a new queue
    const myQueue = new Queue();

    // Add tasks to the queue
    myQueue.enqueue(task.createTask('Task 1'));
    myQueue.enqueue(task.createTask('Task 2'));

    // Process tasks
    myQueue.processQueue();
    ```

## Author
 
 - [Martin Olutade](https://github.com/silgenius/)