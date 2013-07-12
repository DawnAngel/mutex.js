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
    this.lockStatus = false;

    /**
     * Queue of callbacks to process
     * @type Array
     */
    this.lockQueue = [];
}

/**
 * Request to execute the "callback" function in a sequencial way
 *
 * @param  Function callback
 */
Mutex.prototype.lock = function(callback)
{
    if (this.lockStatus) {
        this.lockQueue.push(callback);
    } else {
        this.lockStatus = true;
        callback();
    }
};

/**
 * Release the lock and execute the next "callback" function queued
 */
Mutex.prototype.unlock = function()
{
    var callback;
    if (this.lockQueue.length) {
        callback = this.lockQueue.pop();
        callback();
    } else {
        this.lockStatus = false;
    }
};
