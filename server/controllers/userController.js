import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req, res) => {
  const { username, role, password } = req.body;

  // Basic input validation
  if (!username || !role || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password securely
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const user = await User.create({
      username,
      role,
      password: hashedPassword
    });

    // Exclude password from the returned user object
    const { password: pwd, ...userData } = user.toJSON();

    return res.status(201).json({
      message: 'User registered successfully',
      user: userData
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { registerUser };
