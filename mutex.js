/**
 * Mutual Exclusion System
 *
 * @author Eric Pinto
 */
function Mutex () {
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
}

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
        callback = this.waitingQueue.pop();
        setTimeout(callback, 0);
    } else {
        this.locked = false;
    }
};
