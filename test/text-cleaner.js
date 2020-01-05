const { expect } = require('chai');

const StringCleaner = require('../lib/string-cleaner'),
	TextCleaner = require('../index'),
	testStrings = require('./data/test-strings.json');

describe('TextCleaner', () => {
	it('should be a function', () => {
		expect(TextCleaner).to.be.a('function');
	});

	it('should have a property StringCleaner', () => {
		expect(TextCleaner).to.have.property('StringCleaner');
		expect(TextCleaner.StringCleaner).to.be.a('function');
		expect(TextCleaner.StringCleaner).to.eql(StringCleaner);
	});

	it('should throw an error if provided with undefined', () => {
		expect(() => TextCleaner()).to.throw('toString');
	});

	it('should create a new StringCleaner', () => {
		expect(TextCleaner('')).to.be.a.instanceOf(StringCleaner);
	});

	it('with the provided value', () => {
		const str = 'Test string';
		expect(TextCleaner(str).s).to.equal(str);
		expect(TextCleaner(str).valueOf()).to.equal(str);
	});

	it('should clean complex text when methods are chained', () => {
		testStrings.forEach((test) => {
			const result = TextCleaner(test.input)
				// convert html entities to charachters
				.decodeHtmlEntities()
				// remove all html
				.stripHtml()
				// remove apostrophies in words to preserve them as we will be
				// replacing when with spaces later
				.removeApostrophes()
				// remove non-hyphen dash, preserve hyphenated words
				.removeDashes()
				// dont remove dashes, we have already dealt with them.
				// Replace all characters with a space to prevent words merging
				.removeChars({ exclude: '-', replaceWith: ' ' })
				// compact all whitespace down to a single charachter
				.condense()
				// Sting.prototype.trim()
				.trim()
				// remove common stop words from the string
				.removeStopWords()
				// Sting.prototype.toLowerCase()
				.toLowerCase();
			expect(result.valueOf()).to.equal(test.output);
		});
	});
});
