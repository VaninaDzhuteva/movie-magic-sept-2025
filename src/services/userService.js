import bcrypt from 'bcrypt';

import User from "../models/User.js";

function register(userData) {
    return User.create(userData);
}

async function login(username, password) {
    // Validate user
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid User or Password!')
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid User or Password!')
    }

    // create token
}

export default {
    register, login
}