'use strict';

const StringCleaner = require('./lib/string-cleaner');

const TextCleaner = (str, options) => {
    return new StringCleaner(str, options);
}
TextCleaner.StringCleaner = StringCleaner;

module.exports = TextCleaner;
