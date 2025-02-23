import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req, res, next) => {
    const user = (req).user;
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admin role required' });
    }
    next();
};

export const isEditor = (req, res, next) => {
    const user = (req).user;
    if (user.role !== 'editor' && user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Editor or Admin role required' });
    }
    next();
};