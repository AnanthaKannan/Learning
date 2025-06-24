# Singleton

* What is the primary purpose of the Singleton design pattern?
To restrict instantiation of a class to one object

* In a thread-safe implementation of the Singleton pattern, how is object creation typically controlled?
By using synchronization on the method that creates the instance

* How does the Singleton pattern handle lazy initialization?
By creating the instance only when it is first requested.

* Which of the following is a valid way to prevent cloning of a Singleton object in Java?
override the clone() method and throw CloneNotSupportedException