# Text Cleaner #

A small tool for easily cleaning text.

## Installation

```javascript
npm install text-cleaner --save
```

## Example

```javascript
const TextCleaner = require('text-cleaner');

TextCleaner('Some <b>  TEXT to Clean</b>').removeHtml().condense().toLowerCase().valueOf();
// some text to clean
```

## Usage

### Constructor: TextCleaner(*string*)

Returns an object, with the following methods:

### #valueOf()
```javascript
TextCleaner('STRING').toLowerCase().valueOf()
// "string"
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

### #toUpperrCase()
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
Remove all non-alpha charachters, including numbers
options *object*:
- replaceWith (*default: ""*) Character to replace matched charcters with.
- exclude: (*default: ""*) String of characters to exclude. These are added to a regular expression; e.g. "0-9" would exclude numbers from replacement
```javascript
TextCleaner('~string1!').removeChars({ exclude: '!' }).valueOf()
// "string!"
```
