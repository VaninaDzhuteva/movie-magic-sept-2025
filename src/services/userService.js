import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

const JWT_SECRET = 'efufhiwefi';

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
    const payload = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h'});

    return token;

}

export default {
    register, login
}