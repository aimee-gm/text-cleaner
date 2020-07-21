# Text Cleaner #

A small tool for easily cleaning text.

[![npm version](https://badge.fury.io/js/text-cleaner.svg)](https://badge.fury.io/js/text-cleaner)
[![Build Status](https://travis-ci.org/aimee-gm/text-cleaner.svg?branch=master)](https://travis-ci.org/aimee-gm/text-cleaner)

## Installation

```
npm install text-cleaner --save
```

## Example

```javascript
const TextCleaner = require('text-cleaner');

TextCleaner('Some <b>  TEXT to Clean</b>').stripHtml().condense().toLowerCase().valueOf();
// some text to clean
```

## Usage

### Constructor: TextCleaner(*string*)
```javascript
const cleanString = TextCleaner('string');
```
Returns an object, with the following methods:

### #valueOf() and #toString()
Returns the current working value of the string being cleaned
```javascript
TextCleaner('STRING').valueOf()
// "STRING"
TextCleaner('STRING').toString()
// "STRING"
```

### #length
```javascript
TextCleaner('string').length
// 6
```

### #remove(*search string*)
```javascript
TextCleaner('string').remove('tr').valueOf()
// "sing"
```

### #replace(*search string*, *replace string*)
```javascript
TextCleaner('string').replace('tr', 'l').valueOf()
// "sling"
```

### #trim()
```javascript
TextCleaner(' string ').trim().valueOf()
// "string"
```

### #toLowerCase()
```javascript
TextCleaner('STRING').toLowerCase().valueOf()
// "string"
```

### #toUpperCase()
```javascript
TextCleaner('string').toUpperCase().valueOf()
// "STRING"
```

### #truncate(*length*)
```javascript
TextCleaner('a long string').truncate(6).valueOf()
// "a long"
```

### #condense()
Condenses all white space to a single space
```javascript
TextCleaner('s  \t t 	\nr i n g').condense().valueOf()
// "s t r i n g"
```

### #stripEmails()
```javascript
TextCleaner('Email me at: me@here.com').stripEmails().valueOf()
// "Email me at: "
```

### #stripHtml()
```javascript
TextCleaner('<b>string<lb>').stripHtml().valueOf()
// "string"
```

### #removeChars(*options*)
Remove all non-alpha characters, including numbers. Only letters, white space and characters specified in the exclude option will not be removed.

Options (*object*):
- replaceWith (*default: ""*) Character to replace matched characters with. Allows for characters to be replaced by a space, preventing words from merging on character removal.
- exclude: (*default: ""*) String of characters to exclude. These are added to a regular expression; e.g. "0-9" would exclude numbers from replacement
```javascript
TextCleaner('~string1!').removeChars({ exclude: '!' }).valueOf()
// "string!"
```

### #removeApostrophes()
Remove apostrophes from the text, but leave other single quotes in the text.
```javascript
TextCleaner("a quote: 'he didn't'").removeApostrophes().valueOf()
// "a quote: 'he didnt'"
```
Allows words containing apostrophes to be treated separately to `removeChars()`, such as when replacing characters with a space with `removeChars({ replaceWith: ' ' })`, preserving the word.

```javascript
/* undesired behaviour */
TextCleaner("don't(text)").removeChars({ replaceWith: ' ' }).trim().valueOf()
// "don t text"

/* desired behaviour */
TextCleaner("don't(text)").removeApostrophes().removeChars({ replaceWith: ' ' }).trim().valueOf()
// "dont text"
```

### #removeStopWords()
Remove common stop words from the text for textual/sentiment anlysis. Uses [stopword](https://www.npmjs.com/package/stopword).

```javascript
TextCleaner("the test string with some words").removeStopWords().valueOf()
// "test string words"
```
