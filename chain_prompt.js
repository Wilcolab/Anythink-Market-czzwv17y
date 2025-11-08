const assert = require('assert');

// chain_prompt.js
// GitHub Copilot

'use strict';

/**
 * Convert various inputs to kebab-case with robust Unicode and acronym handling.
 * @param {*} input
 * @param {Object} options
 * @param {boolean} options.preserveAcronyms - keep all-uppercase tokens intact (default false)
 * @param {boolean} options.preserveCase - do not force-lowercase tokens (default false)
 * @param {boolean} options.removeDiacritics - strip diacritics using NFKD normalization (default true)
 */
function toKebabCase(input, options = {}) {
    const {
        preserveAcronyms = false,
        preserveCase = false,
        removeDiacritics = true,
    } = options;

    if (input == null) return ''; // handles null and undefined

    // Convert non-strings, trim whitespace
    let s = String(input).trim();
    if (s.length === 0) return '';

    // Normalize and optionally remove diacritics (NFKD separates base chars + combining marks)
    if (removeDiacritics && s.normalize) {
        s = s.normalize('NFKD').replace(/[\u0300-\u036f]/g, ''); // strip combining marks
    } else if (s.normalize) {
        // still normalize to get consistent casing behavior but keep diacritics
        s = s.normalize('NFKC');
    }

    // Replace common separators with a hyphen:
    // spaces, underscores, slashes, backslashes, dots, commas, pipes, parentheses, brackets, braces, colons, semicolons, plus, equals
    s = s.replace(/[\s_\/\\\.,\|\(\)\[\]\{\}:\;\+\=]+/g, '-');

    // Remove quotes and punctuation entirely so they don't leave extra hyphens.
    // This removes characters like single/double/back quotes, typographic quotes, and common punctuation.
    s = s.replace(/['"`\u2018\u2019\u201C\u201D~!@#\$%\^&\*\?<>\u2013\u2014]+/g, '');

    // Split acronym sequences like "XMLHttp" -> "XML-http"
    // ([A-Z]+)([A-Z][a-z]) : an uppercase run followed by an upper+lower (start of a normal-cased word)
    s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');

    // Split camelCase boundaries: "fooBar" -> "foo-Bar" (we'll lowercase later)
    // ([a-z0-9])([A-Z]) : lower/digit followed by upper
    s = s.replace(/([a-z0-9])([A-Z])/g, '$1-$2');

    // Remove any remaining characters that are not letters, numbers or hyphen.
    // Use Unicode property escapes to keep non-ASCII letters when desired.
    s = s.replace(/[^\p{L}\p{N}-]+/gu, '');

    // Collapse multiple hyphens and trim edges
    s = s.replace(/-+/g, '-').replace(/^-|-$/g, '');

    if (s.length === 0) return '';

    // If preserveCase is requested, return tokens as-is (just normalized separators)
    if (preserveCase) return s;

    // Otherwise, handle lowercasing with optional acronym preservation.
    const tokens = s.split('-').map((tok) => {
        // Detect an "all-uppercase" token (contains at least one letter and equals its uppercased form)
        const hasLetter = /[A-Za-z\u00C0-\u017F]/.test(tok); // approximate unicode letter test for acronym detection
        const isAllUpper = hasLetter && tok === tok.toUpperCase();

        if (preserveAcronyms && isAllUpper) return tok; // keep acronyms intact
        return tok.toLowerCase();
    });

    return tokens.join('-');
}

module.exports = toKebabCase;

// Compact tests (Node assert)
if (require.main === module) {

    // Basic separators and trimming
    assert.strictEqual(toKebabCase(null), '');
    assert.strictEqual(toKebabCase(undefined), '');
    assert.strictEqual(toKebabCase('  Foo_bar.Test/Case  '), 'foo-bar-test-case');

    // camelCase and numeric chunks
    assert.strictEqual(toKebabCase('fooBar'), 'foo-bar');
    assert.strictEqual(toKebabCase('v2Endpoint'), 'v2-endpoint');

    // Acronym splitting and preservation
    assert.strictEqual(toKebabCase('XMLHttpRequest'), 'xml-http-request');
    assert.strictEqual(toKebabCase('XMLHttpRequest', { preserveAcronyms: true }), 'XML-http-request');

    // SCREAMING_SNAKE_CASE handling
    assert.strictEqual(toKebabCase('HELLO_WORLD'), 'hello-world');
    assert.strictEqual(toKebabCase('HELLO_WORLD', { preserveAcronyms: true }), 'HELLO-WORLD');

    // Diacritics
    assert.strictEqual(toKebabCase('café crème'), 'cafe-creme');
    assert.strictEqual(toKebabCase('café crème', { removeDiacritics: false }), 'café-creme');

    // Quotes and punctuation removal
    assert.strictEqual(toKebabCase("hello's \"test\"!"), 'hellos-test');

    console.log('All tests passed');
}