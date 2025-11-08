/**
 * Convert a string to camelCase.
 * Handles spaces, underscores, dashes and multiple separators.
 *
 * Examples:
 *   toCamelCase('first name')   -> 'firstName'
 *   toCamelCase('user_id')      -> 'userId'
 *   toCamelCase('SCREEN_NAME')  -> 'screenName'
 *   toCamelCase('mobile-number')-> 'mobileNumber'
 */
function toCamelCase(input) {
    if (typeof input !== 'string') return '';
    const parts = input.trim().split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';
    const first = parts[0].toLowerCase();
    const rest = parts
        .slice(1)
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join('');
    return first + rest;
}

module.exports = toCamelCase;

// Quick demo when run directly
if (require.main === module) {
    console.log(toCamelCase('first name'));    // firstName
    console.log(toCamelCase('user_id'));       // userId
    console.log(toCamelCase('SCREEN_NAME'));   // screenName
    console.log(toCamelCase('mobile-number')); // mobileNumber
}