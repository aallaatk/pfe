import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/user.js';

const JWT_SECRET = 'dWmalAS5rvdzizu545';

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid email or password' };
        }

        let role = 'user'; // Default role for regular users

        // Check if the user is a guide
        if (user.isGuider) {
            role = 'guider';
        }

        // Check if the provided email matches admin email
        if (email.toLowerCase() === 'sleimiala@gmail.com') {
            role = 'admin';
        }

        // Generate JWT token with user ID and expiration
        const token = generateToken(user);

        return {
            success: true,
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role // Assign determined role
            }
        };

    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Internal Server Error' };
    }
};

export { login };
