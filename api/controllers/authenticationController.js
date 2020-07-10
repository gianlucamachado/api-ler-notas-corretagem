const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config().parsed;

module.exports = app => {
    const controller = {};

    controller.verifyJWT = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            
            const split = authHeader ? authHeader.split(' ') : [];
            const token = split.length > 0 ? split[1] : null;
            
            if (!token) {
                const response = {};
                response.auth = false;
                response.message = 'No token provided.';
                return res.status(401).json(response);
            }
            
            jwt.verify(token, dotenv.SECRET, async (err, decoded) => {

                if (err) {
                    const response = {};
                    response.auth = false;
                    response.message = 'Failed to authenticate token.';
                    return res.status(403).json(response);
                }

                req.userId = decoded.id;
                next();
            });

        } catch (error) {
            console.error(error);
            res.status(400).json(error);
        }
    };

    return controller;
}