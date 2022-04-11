# quick nodejs project using the highlight.js module

convert a plain html documnet into a pre-highlighted one, rather than asking the client to run JS.

finds

	<code>command
	</code>
	
	<code>
	command
	</code>
	
	<pre><code>command
	</code></pre>
	
	<pre><code>
	command
	</code></pre>

where "command" could be any number of lines of commands and there any number of whitespace characters before any lines. Including the 
	
``<code> <pre><code>``

## TODO

Could better try and guess the language and hint to highlight.js