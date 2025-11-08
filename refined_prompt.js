/**
 * @typedef {Object} CamelCaseOptions
 * @property {boolean} [pascal=false] If true, produce PascalCase (first character of the result is uppercase).
 * @property {boolean} [preserveAcronyms=false] If true, keep all-uppercase words (acronyms, e.g. "API" or "XML")
 *           intact instead of lowercasing them. Acronyms are detected as tokens that contain only A-Z and 0-9.
 * @property {boolean} [preserveCase=false] If true, do not force lowercasing of tokens and try to preserve the
 *           original letter case for each token. When both preserveCase and pascal are true, only the very first
 *           character is uppercased to satisfy PascalCase but the rest of the first token is left untouched.
 */

/**
 * Convert an arbitrary value to camelCase or PascalCase.
 *
 * Robust handling includes:
 * - Accepts non-string inputs by converting them to string (String(input)).
 * - Trims leading and trailing whitespace.
 * - Attempts Unicode normalization (NFKD) and strips common diacritic combining marks.
 * - Removes single/double quotes and common bullet characters.
 * - Treats a wide set of punctuation/separators (underscores, dashes, dots, slashes, pipes, commas, plus,
 *   colons, parentheses, brackets, braces, equals, @, #, etc.) as separators and collapses them into word boundaries.
 * - Inserts word boundaries for existing camelCase and mixed-case acronyms so that "fooBar" → ["foo","Bar"]
 *   and "XMLHttpRequest" → ["XML","Http","Request"].
 * - Preserves numeric chunks as separate tokens.
 * - Collapses multiple separators/spaces and ignores empty tokens.
 *
 * Options:
 * - pascal: output PascalCase (Uppercase initial letter) when true; otherwise output lower camelCase.
 * - preserveAcronyms: retain tokens that are entirely uppercase (A-Z and 0-9) as-is instead of lowercasing them.
 * - preserveCase: retain the original case of each token; this takes precedence over lowercasing behavior.
 *
 * Edge cases & notes:
 * - If input is null or undefined, the function returns an empty string.
 * - If the normalized/trimmed input contains no valid word tokens, the function returns an empty string.
 * - When preserveAcronyms is true, tokens matching /^[A-Z0-9]+$/ remain unchanged (e.g., "API" stays "API").
 * - When preserveCase is true, tokens are not force-lowercased; combining with pascal will uppercase only the first
 *   character of the first token to produce PascalCase while leaving the rest of the token's original casing intact.
 *
 * @param {*} input The input value to convert. Non-string inputs are coerced to string.
 * @param {CamelCaseOptions} [options] Configuration options to control output style and case preservation.
 * @returns {string} The converted string in camelCase or PascalCase depending on options.
 *
 * @example
 * // basic camelCase
 * robustCamelCase("  foo_bar-baz "); // => "fooBarBaz"
 *
 * @example
 * // acronyms handling
 * robustCamelCase("XML_http-request"); // => "xmlHttpRequest"
 * robustCamelCase("XML_http-request", { preserveAcronyms: true }); // => "XMLHttpRequest"
 *
 * @example
 * // apostrophes removed, numeric tokens preserved
 * robustCamelCase("user's profile v2"); // => "usersProfileV2"
 *
 * @example
 * // PascalCase and preserveCase behavior
 * robustCamelCase("my CUSTOM value", { pascal: true }); // => "myCustomValue" (default lowercasing)
 * robustCamelCase("my CUSTOM value", { pascal: true, preserveCase: true }); // => "My CUSTOM value"
 */

/**
 * @typedef {Object} DotCaseOptions
 * @property {boolean} [preserveAcronyms=false] If true, keep all-uppercase words (e.g. "API") intact rather than
 *           lowercasing them. Acronyms are detected as tokens that contain only A-Z and 0-9.
 * @property {boolean} [preserveCase=false] If true, do not force lowercasing of tokens and preserve their original case.
 */

/**
 * Convert an arbitrary value to dot.case (lowercase words separated by dots).
 *
 * Robust handling includes:
 * - Accepts non-string inputs by converting them to string.
 * - Trims leading and trailing whitespace.
 * - Attempts Unicode normalization (NFKD) and strips common diacritic combining marks.
 * - Removes single/double quotes and common bullet characters.
 * - Treats a wide set of punctuation/separators (including dots) as token separators and collapses them into
 *   word boundaries so that "a.b" and "a_b" are treated equivalently.
 * - Inserts boundaries for camelCase and acronym+Word sequences so that "fooBar" → ["foo","Bar"]
 *   and "XMLHttp" → ["XML","Http"].
 * - Preserves numeric chunks as separate tokens.
 * - Collapses multiple separators into a single dot and trims leading/trailing dots from the result.
 *
 * Options:
 * - preserveAcronyms: retain tokens that are entirely uppercase (A-Z and 0-9) as-is instead of lowercasing them.
 * - preserveCase: retain the original case of tokens; when false, tokens are lowercased by default.
 *
 * Edge cases & notes:
 * - If input is null or undefined, the function returns an empty string.
 * - If the normalized/trimmed input contains no valid word tokens, the function returns an empty string.
 * - When preserveAcronyms is true, tokens matching /^[A-Z0-9]+$/ remain unchanged (e.g., "API" stays "API").
 * - The function collapses sequences of separators into a single dot and removes any leading/trailing dots.
 *
 * @param {*} input The input value to convert. Non-string inputs are coerced to string.
 * @param {DotCaseOptions} [options] Configuration options to control acronym and case preservation.
 * @returns {string} The converted string in dot.case (tokens separated by single dots).
 *
 * @example
 * // basic dot.case
 * robustDotCase("  foo_bar-baz "); // => "foo.bar.baz"
 *
 * @example
 * // camelCase & acronym splitting
 * robustDotCase("XML_http-request"); // => "xml.http.request"
 * robustDotCase("XML_http-request", { preserveAcronyms: true }); // => "XML.http.request"
 *
 * @example
 * // apostrophes removed, numeric tokens preserved
 * robustDotCase("user's profile v2"); // => "users.profile.v2"
 */
;