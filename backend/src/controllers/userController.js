import { Request, Response } from 'express';
import User from '../models/userModel';

// Fetch all users (admin-only)
export const getUsers = async (req, res) => {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json(users);
};

// Update user role (admin-only)
export const updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();
    res.json({ message: 'User role updated successfully' });
};