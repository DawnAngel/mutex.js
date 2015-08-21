/**
 * Mutual Exclusion System
 *
 * @author Eric Pinto
 */
var Mutex = function(lifo) {
    /**
     * Current lifo configuration (Default: false)
     *   true : Stack Mode (Last In First Out)
     *   false: Queue Mode (First In First Out)
     * @type Boolean
     */
    this.lifo = lifo || false;

    /**
     * Current Lock status
     * @type Boolean
     */
    this.locked = false;

    /**
     * Queue of callbacks to process
     * @type Array
     */
    this.waitingQueue = [];
};

/**
 * Request to execute the "callback" function in a sequencial way
 *
 * @param  Function callback
 */
Mutex.prototype.lock = function(callback)
{
    if (this.locked) {
        this.waitingQueue.push(callback);
    } else {
        this.locked = true;
        setTimeout(callback, 0);
    }
};

/**
 * Release the lock and execute the next "callback" function queued
 */
Mutex.prototype.unlock = function()
{
    var callback;
    if (this.waitingQueue.length) {
        if (this.lifo) {
            /**
             * Stack Mode
             * a. [1, 2] <- 3
             * b. [1, 2, 3]
             * c. [1, 2] -> 3
             */
            callback = this.waitingQueue.pop();
        } else {
            /**
             * Queue Mode
             * a. [1, 2] <- 3
             * b. [1, 2, 3]
             * c. 1 <- [2, 3]
             */
            callback = this.waitingQueue.shift();
        }
        setTimeout(callback, 0);
    } else {
        this.locked = false;
    }
};
