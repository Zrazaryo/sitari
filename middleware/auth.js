// middleware/auth.js - Authentication Middleware Example
// For use in Node.js/Express backend

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No authorization token provided'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.SESSION_SECRET || 'your_secret_key'
        );

        // Attach user info to request
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token',
            message: error.message
        });
    }
};

const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'User not authenticated'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden',
                message: `Required roles: ${allowedRoles.join(', ')}`
            });
        }

        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
