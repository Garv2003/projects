"use server";

import axios from 'axios';
import { cookies } from 'next/headers';

export async function registerUser({ name, email, password, phone }: { name: string; email: string; password: string; phone: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Create a new user
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone,
        },
    });

    return { message: 'User registered successfully', userId: newUser.id };
}

export async function loginUser({ email, password }: { email: string; password: string }) {
    // Find the user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User does not exist');
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
    });

    return { message: 'Login successful' };
}

export async function logoutUser() {
    // Clear the token cookie
    (await cookies()).delete('token');
    return { message: 'Logout successful' };
}