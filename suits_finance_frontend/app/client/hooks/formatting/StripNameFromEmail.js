function stripNameFromEmail(email) {
    if (typeof email !== 'string') {
        throw new Error('Invalid input: email must be a string');
    }
    const atIndex = email.indexOf('@');

    if (atIndex === -1) {
        throw new Error('Invalid email format');
    }
    return email.substring(0, atIndex);
}

export default stripNameFromEmail;