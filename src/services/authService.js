import bcrypt from 'bcrypt';

import User from "../models/User.js";
import { generateAuthToken } from '../utils/tokenUtils.js';

async function register(userData) {

    // Check if User exist
    const userExists = await User.exists({email: userData.email});

    if (userExists) {
        throw new Error("User already exists!");   
    }

    // Check if passwords match
    if (userData.password !== userData.rePassword) {
        throw new Error("Passwords must match!");
    }

    const user = await User.create(userData);

    const token = generateAuthToken(user);

    return token;
}

async function login(email, password) {
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
    const token = generateAuthToken(user);

    return token;
}

export default {
    register, login
}