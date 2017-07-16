const StringCleaner = require('../lib/string-cleaner'),
	expect = require('chai').expect;

describe('StringCleaner', () => {
	let test1,
		test2;

	beforeEach(() => {
		test1 = new StringCleaner('test');
		test2 = new StringCleaner('abcdefg');
	});

	it('should be a function', () => {
		expect(StringCleaner).to.be.a('function');
	});

	describe('constructor', () => {
		it('should assign the provided value to s', () => {
			expect(test1.s).to.equal('test');
			expect(test2.s).to.equal('abcdefg');
		});

		it('should convert non-strings to strings', () => {
			expect(() => new StringCleaner({})).to.not.throw('string');
			expect(() => new StringCleaner(123)).to.not.throw('string');

			const objStr = new StringCleaner({});

			expect(objStr.s).to.equal('[object Object]');
		});
	});

	describe('get s() and valueOf()', () => {
		it('should return the stored string', () => {
			expect(test1.s).to.equal(test1.valueOf()).to.equal('test');
			expect(test2.s).to.equal(test2.valueOf()).to.equal('abcdefg');
		});
	});

	describe('get length()', () => {
		it('should return the length of the string', () => {
			expect(test1.length).to.equal(4);
			expect(test2.length).to.equal(7);
		});
	});

	describe('trim()', () => {
		it('should trim the string', () => {
			const test = new StringCleaner(' trim me ');
			test.trim();
			expect(test.valueOf()).to.equal('trim me');
		});

		it('should be chainable', () => {
			expect(test1.trim()).to.equal(test1);
		});
	});

	describe('toLowerCase()', () => {
		it('should convert the string to lowercase', () => {
			const test = new StringCleaner('SHOUTY TEXT');
			test.toLowerCase();
			expect(test.valueOf()).to.equal('shouty text');
		});

		it('should be chainable', () => {
			expect(test1.toLowerCase()).to.equal(test1);
		});
	});

	describe('toUpperCase()', () => {
		it('should convert the string to upeprcase', () => {
			test2.toUpperCase();
			expect(test2.valueOf()).to.equal('ABCDEFG');
		});

		it('should be chainable', () => {
			expect(test1.toUpperCase()).to.equal(test1);
		});
	});

	describe('truncate()', () => {
		it('should truncate the string to the specified length', () => {
			test2.truncate(3);
			expect(test2.valueOf()).to.equal('abc');
		});

		it('should be chainable', () => {
			expect(test1.truncate(3)).to.equal(test1);
		});
	});

	describe('stripEmails()', () => {
		it('should remove emails from the string', () => {
			const stringWithEmail = new StringCleaner('Please email here@there.com');
			stringWithEmail.stripEmails();
			expect(stringWithEmail.valueOf()).to.equal('Please email ');
		});

		it('should be chainable', () => {
			expect(test1.stripEmails()).to.equal(test1);
		});
	});

	describe('stripHtml()', () => {
		it('should remove HTML tags from the string', () => {
			const stringWithHtml = new StringCleaner('Welcome, <b class="name">Fred Jones</b>');
			stringWithHtml.stripHtml();
			expect(stringWithHtml.valueOf()).to.equal('Welcome, Fred Jones');
		});

		it('should be chainable', () => {
			expect(test1.stripHtml()).to.equal(test1);
		});
	});

	describe('stripPhoneNumbers()', () => {
		it('should remove HTML tags from the string', () => {
			const testString = new StringCleaner('Call me on +86 800 555 1234');
			testString.stripPhoneNumbers();
			expect(testString.valueOf()).to.equal('Call me on');
		});

		it('should be chainable', () => {
			expect(test1.stripPhoneNumbers()).to.equal(test1);
		});
	});

	describe('anglicize()', () => {
		it('should remove HTML tags from the string', () => {
			const testString = new StringCleaner('ÂÇİĞÖŞÜÑ âçığöşüñ');
			testString.anglicize();
			expect(testString.valueOf()).to.equal('ACIGOSUN acigosun');
		});

		it('should be chainable', () => {
			expect(test1.anglicize()).to.equal(test1);
		});
	});

	describe('removeChars()', () => {
		it('should remove special charachters from the string', () => {
			const testString = new StringCleaner('%e$"a !@#j');
			testString.removeChars();
			expect(testString.valueOf()).to.equal('ea j');
		});

		it('should not remove the provided special charachters from the string', () => {
			const testString = new StringCleaner('%e$"a !@#j');
			testString.removeChars({ exclude: '$!' });
			expect(testString.valueOf()).to.equal('e$a !j');
		});

		it('should be chainable', () => {
			expect(test1.removeChars()).to.equal(test1);
		});
	});

	describe('removeApostrophes()', () => {
		it('should remove apostrophies from inside words', () => {
			['\'', '`', '’'].forEach((a) => {
				const testString = new StringCleaner(`relax, don${a}t do it`);
				testString.removeApostrophes();
				expect(testString.valueOf()).to.equal('relax, dont do it');
			});
		});

		it('should not remove apostrophies from quotes', () => {
			const testString = new StringCleaner('he said \'relax\'');
			testString.removeApostrophes();
			expect(testString.valueOf()).to.equal('he said \'relax\'');
		});

		it('should be chainable', () => {
			expect(test1.removeApostrophes()).to.equal(test1);
		});
	});

	describe('removeStopWords()', () => {
		it('should remove stop words from the string', () => {
			const testString = new StringCleaner('the cat sat on the mat');
			testString.removeStopWords();
			expect(testString.valueOf()).to.equal('cat sat mat');
		});

		it('should be chainable', () => {
			expect(test1.removeStopWords()).to.equal(test1);
		});
	});

	describe('decodeHtmlEntities()', () => {
		it('should remove stop words from the string', () => {
			const testString = new StringCleaner('&lt;div&gt;test text&lt;/div&gt;');
			testString.decodeHtmlEntities();
			expect(testString.valueOf()).to.equal('<div>test text</div>');
		});

		it('should should decode &nbsp; to condensable whitespace', () => {
			const testString = new StringCleaner('&lt;div&gt;test&nbsp;text&lt;/div&gt;');
			testString.decodeHtmlEntities().condense();
			expect(testString.valueOf()).to.equal('<div>test text</div>');
		});

		it('should be chainable', () => {
			expect(test1.decodeHtmlEntities()).to.equal(test1);
		});
	});

	describe('removeHtmlEntities()', () => {
		it('should remove html encoded entities from the string', () => {
			const testString = new StringCleaner('&lt;div&gt;test text&lt;/div&gt;');
			testString.removeHtmlEntities();
			expect(testString.valueOf()).to.equal('divtest text/div');
		});

		it('should be chainable', () => {
			expect(test1.removeHtmlEntities()).to.equal(test1);
		});
	});

	describe('removeDashes()', () => {
		it('should remove free dashes from text', () => {
			const testString = new StringCleaner('---Test string ---- some other text--');
			testString.removeDashes();
			expect(testString.valueOf()).to.equal('Test string  some other text');
		});

		it('should not remove dashes from hyphenated words', () => {
			const testString = new StringCleaner('Some text with a hyphenated-word.');
			testString.removeDashes();
			expect(testString.valueOf()).to.equal('Some text with a hyphenated-word.');
		});

		it('should be chainable', () => {
			expect(test1.removeDashes()).to.equal(test1);
		});
	});
});
