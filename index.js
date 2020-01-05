const StringCleaner = require('./lib/string-cleaner'),
	TextCleaner = (str, options) => new StringCleaner(str, options);

TextCleaner.StringCleaner = StringCleaner;

module.exports = TextCleaner;
