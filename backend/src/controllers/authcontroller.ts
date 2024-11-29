import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { jwtConfig } from '../config/jwtConfig';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { username,email, password } = req.body;

        // Validate input
        if (!username ||!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash: hashedPassword, // Fixed field name
            },
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error during registration:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        // Find the user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) { // Fixed field name
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT and set it as a cookie
        const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });
        res.cookie('jwt', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Secure cookie
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error during login:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('jwt', { httpOnly: true });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};
