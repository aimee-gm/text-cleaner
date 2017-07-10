# Text Cleaner #

A small tool for easily cleaning text.

## Example use ##

```javascript
const TextCleaner = require('text-cleaner');

const dirtyText = 'Some <b>  TEXT to Clean</b>';

TextCleaner(dirtyText).removeHtml().condense().toLowerCase().valueOf();
// some text to clean
```
