mutex.js
========

A Mutex locking system non-blocking for Javascript

### Usage ###

Download the [library](https://raw.github.com/DawnAngel/mutex.js/master/mutex.js) and include it in your html.

```html
<script src="js/three.min.js"></script>
```

Then you just need to create an instance of the class and use it this way.

```html
<script>

	var mutex = new Mutex();

	mutex.lock(function(){
		/* The code to process goes here */
		console.log('Processing the code');

		/* When the processing is finished */
		mutex.unlock();
	});

</script>
```