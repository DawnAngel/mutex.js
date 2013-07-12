/**
 * Mutual Exclusion System
 *
 * @author Eric Pinto
 */
var mutex = window.mutex || {
    /**
     * Current Lock status
     * @type Boolean
     */
    lockStatus: false,

    /**
     * Queue of callbacks to process
     * @type Array
     */
    lockQueue: [],

    /**
     * Request to execute the "callback" function in a sequencial way
     *
     * @param  Function callback
     */
    lock: function(callback)
    {
        if (mutex.lockStatus) {
            mutex.lockQueue.push(callback);
        } else {
            mutex.lockStatus = true;
            callback();
        }
    },

    /**
     * Release the lock and execute the next "callback" function queued
     */
    unlock: function()
    {
        var callback;
        if (mutex.lockQueue.length) {
            callback = mutex.lockQueue.pop();
            callback();
        } else {
            mutex.lockStatus = false;
        }
    }
};