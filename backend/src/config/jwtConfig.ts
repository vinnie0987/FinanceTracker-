// jwtConfig.ts - Contains configuration for JWT token generation and verification

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'your-secret-key', // Secret key used for signing the JWT
    expiresIn: '1d',  // Set token expiration time (e.g., 1 day)
};
