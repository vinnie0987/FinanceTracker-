// authService.ts (or in your relevant authentication handler file)
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';  // Import the config

// Function to generate JWT token after successful login or registration
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

// Function to verify the JWT token (typically used in protected routes)
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtConfig.secret);  // Verifies the token using the secret
  } catch (err) {
    throw new Error('Token is invalid or expired');
  }
};
