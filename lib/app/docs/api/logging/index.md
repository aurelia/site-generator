# Logging Module

> A minimal but effective logging mechanism with support for log levels and pluggable log appenders.

## Classes


### Logger

A logger logs messages to a set of appenders, depending on the log level that is set.

#### Properties

* `id: string` - The id that the logger was created with.
* `level: number` - The logging severity level for this logger

#### Methods


* `debug(message: string, rest: ): void` - Logs a debug message.
  * `message: string` - The message to log.
  * `rest: ` - The data to log.



* `error(message: string, rest: ): void` - Logs an error.
  * `message: string` - The message to log.
  * `rest: ` - The data to log.



* `info(message: string, rest: ): void` - Logs info.
  * `message: string` - The message to log.
  * `rest: ` - The data to log.



* `setLevel(level: number): void` - Sets the level of logging for this logger instance
  * `level: number` - Matches a value of logLevel specifying the level of logging.



* `warn(message: string, rest: ): void` - Logs a warning.
  * `message: string` - The message to log.
  * `rest: ` - The data to log.




## Interfaces


### Appender

Implemented by classes which wish to append log data to a target data store.

#### Properties


#### Methods


* `debug(logger: Logger, rest: ): void` - Appends a debug log.
  * `logger: Logger` - The source logger.
  * `rest: ` - The data to log.



* `error(logger: Logger, rest: ): void` - Appends an error log.
  * `logger: Logger` - The source logger.
  * `rest: ` - The data to log.



* `info(logger: Logger, rest: ): void` - Appends an info log.
  * `logger: Logger` - The source logger.
  * `rest: ` - The data to log.



* `warn(logger: Logger, rest: ): void` - Appends a warning log.
  * `logger: Logger` - The source logger.
  * `rest: ` - The data to log.




### LogLevel

Specifies the available logging levels.

#### Properties

* `debug: number` - Log all messages.
* `error: number` - Log only error messages.
* `info: number` - Log informational messages or above.
* `none: number` - No logging.
* `warn: number` - Log warnings messages or above.

#### Methods



## Constants

* `logLevel: LogLevel` - Specifies the available logging levels.

## Functions


* `addAppender(appender: Appender): void` - Adds an appender capable of processing logs and channeling them to an output.
  * `appender: Appender` - An appender instance to begin processing logs with.



* `addCustomLevel(name: string, value: number): void` - Adds a custom log level that will be added as an additional method to Logger.
Logger will call the corresponding method on any appenders that support it.
  * `name: string` - The name for the new log level.
  * `value: number` - The numeric severity value for the level (higher is more severe).



* `clearAppenders(): void` - Removes all appenders.


* `getAppenders(): any` - Gets an array of all appenders.


* `getLevel(): number` - Gets the level of logging of ALL the application loggers.


* `getLogger(id: string): Logger` - Gets the instance of a logger associated with a particular id (or creates one if it doesn&#x27;t already exist).
  * `id: string` - The id of the logger you wish to get an instance of.


* `removeAppender(appender: Appender): void` - Removes an appender.
  * `appender: Appender` - An appender that has been added previously.



* `removeCustomLevel(name: string): void` - Removes a custom log level.
  * `name: string` - The name of a custom log level that has been added previously.



* `setLevel(level: number): void` - Sets the level of logging for ALL the application loggers.
  * `level: number` - Matches a value of logLevel specifying the level of logging.


