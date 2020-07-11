const body = require('express-validator').body;
const validationResult = require('express-validator').validationResult;

module.exports = app => {
    const controller = {};

    controller.login = () => {
        const validator = [];
        validator.push(body('email').isEmail().normalizeEmail());

        const password = {};
        password.min = 6;
        password.max = 10;
        validator.push(body('password').isLength(password).trim());

        return validator;
    };

    controller.logout = () => {
        const validator = [];
        return validator;
    };

    controller.validate = async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const response = {};
                response.errors = errors.array();
                return res.status(422).json(response);
            }

            next();
        } catch (error) {
            res.status(400).json(error);
        }
    };

    return controller;
}