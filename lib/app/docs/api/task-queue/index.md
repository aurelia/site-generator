# Task Queue Module

## Classes


### TaskQueue

Implements an asynchronous task queue.

#### Properties

* `flushing:any` - Whether the queue is in the process of flushing.
* `longStacks:any` - Enables long stack traces for queued tasks.

#### Methods


* `flushMicroTaskQueue(): void` - Immediately flushes the micro task queue.


* `flushTaskQueue(): void` - Immediately flushes the task queue.


* `prepareQueueStack(separator?: any): any` - 
  * `separator?:any` - No description available


* `queueMicroTask(task: ): void` - Queues a task on the micro task queue for ASAP execution.
  * `task:` - The task to queue up for ASAP execution.



* `queueTask(task: ): void` - Queues a task on the macro task queue for turn-based execution.
  * `task:` - The task to queue up for turn-based execution.




## Interfaces


### Task

Either a Function or a class with a call method that will do work when dequeued.

#### Properties


#### Methods


* `call(): void` - Call it.



## Constants


## Functions

