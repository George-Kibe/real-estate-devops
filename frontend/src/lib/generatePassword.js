/**
 * Generates a random password with the specified length.
 * The password will contain at least one number, one special character,
 * and a mix of uppercase and lowercase letters.
 *
 * @param {number} [length=12] - The desired length of the password, defaults to 12.
 * @returns {string} - The generated password.
 */
const generatePassword = (length = 12) => {
    if (length < 4) {
        throw new Error("Password length must be at least 4 characters.");
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    const allCharacters = lowercase + uppercase + numbers + specialCharacters;

    let password = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
    ];

    for (let i = password.length; i < length; i++) {
        password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    password.sort(() => Math.random() - 0.5); // Shuffle using Array.sort

    return password.join('');
};

export default generatePassword;