const anglicize = require("anglicize"),
  emailRegex = require("email-regex"),
  ent = require("ent"),
  escapeStringRegexp = require("escape-string-regexp"),
  phoneRegex = require("phone-regex"),
  stopword = require("stopword"),
  striptags = require("striptags");

class StringCleaner {
  constructor(str) {
    if (typeof str === "undefined" || !str.toString) {
      throw new Error(
        "StringCleaner constructor must recieve a value with a toString() method"
      );
    }
    this.s = str.toString();
  }

  valueOf() {
    return this.toString();
  }

  toString() {
    return this.s;
  }

  get length() {
    return this.s.length;
  }

  remove(search) {
    return this.replace(search, "");
  }

  replace(search, replace) {
    this.s = this.s.replace(search, replace);
    return this;
  }

  trim() {
    this.s = this.s.trim();
    return this;
  }

  toLowerCase() {
    this.s = this.s.toLowerCase();
    return this;
  }

  toUpperCase() {
    this.s = this.s.toUpperCase();
    return this;
  }

  truncate(len) {
    this.s = this.s.substring(0, len);

    return this;
  }

  condense() {
    return this.trim().replace(/\s+/g, " ");
  }

  stripEmails() {
    return this.remove(emailRegex());
  }

  stripHtml() {
    this.s = striptags(this.s);
    return this;
  }

  stripPhoneNumbers() {
    return this.remove(phoneRegex());
  }

  anglicize() {
    this.s = anglicize(this.s);
    return this;
  }

  removeChars(options) {
    const opts = Object.assign(
      {
        replaceWith: "",
        exclude: "",
      },
      options
    );

    const re = new RegExp(
      `[^a-z\\s${escapeStringRegexp(opts.exclude)} ]`,
      "gi"
    );

    return this.replace(re, opts.replaceWith);
  }

  removeApostrophes() {
    const re = /[a-z]('|`|’)[a-z]/gi;
    let match = re.exec(this.s);

    while (match !== null) {
      // eslint-disable-line no-cond-assign
      this.s =
        this.s.substring(0, match.index + 1) +
        this.s.substring(match.index + 2, this.s.length);

      match = re.exec(this.s);
    }

    return this;
  }

  removeStopWords() {
    this.s = stopword.removeStopwords(this.s.split(" ")).join(" ");
    return this;
  }

  decodeHtmlEntities() {
    this.s = ent.decode(this.s);
    return this;
  }

  removeHtmlEntities() {
    return this.remove(/&[#0-9a-z]+;/gi);
  }

  removeDashes() {
    const re = /((^|[^a-z])-+|-+([^a-z]|$))/gi;
    let match = re.exec(this.s);

    while (match !== null) {
      // eslint-disable-line no-cond-assign
      this.s =
        this.s.substring(0, match.index) +
        match[0].replace(/-/g, "") +
        this.s.substring(match.index + match[0].length, this.s.length);

      match = re.exec(this.s);
    }

    return this;
  }
}

module.exports = StringCleaner;
