# Text Cleaner #

A small tool for easily cleaning text.

## Example use ##

~~~
const TextCleaner = require('text-cleaner');

const dirtyText = 'Some <b>  dirty</b> TEXT';

const cleaned = TextCleaner(dirtyText).removeHtml().condense().toLowerCase().valueOf();
// some dirty text
~~~