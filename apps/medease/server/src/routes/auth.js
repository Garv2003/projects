import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const existingUser = await User.find({ email });
        if (existingUser.length) {
            return res.status(409).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, phone });
        return res.json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).send({
            message: 'Error registering user'
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, 'secret', {
            expiresIn: '1h'
        });
        return res.json({
            message: 'User logged in successfully',
            token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).send({
            message: 'Error logging in user'
        });
    }
});

export default router;  