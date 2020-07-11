const pool = require('../db/pool');

const body = require('express-validator').body;
const param = require('express-validator').param;
const validationResult = require('express-validator').validationResult;

const UsersDAO = require('../dao/usersDAO').UsersDAO;
const dao_users = new UsersDAO();

module.exports = app => {
    const controller = {};

    controller.createUser = () => {
        const validator = [];

        const existsEmail = async (email) => {
            return pool.connect().then(client => {
                const response = dao_users.getByEmail(client, email);
                client.release();

                return response;
            }).then(user => {
                console.log(user);

                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        };

        validator.push(body('email').normalizeEmail().isEmail().bail().custom(existsEmail));

        const complete_name = {};
        complete_name.max = 100;
        validator.push(body('complete_name').isLength(complete_name).bail().notEmpty());

        const password = {};
        password.min = 6;
        password.max = 10;
        validator.push(body('password').isLength(password).trim());

        return validator;
    };

    controller.updateUser = () => {
        const validator = [];
        validator.push(param('userId').isInt());

        const complete_name = {};
        complete_name.max = 100;
        validator.push(body('complete_name').isLength(complete_name).bail().notEmpty());

        return validator;
    };

    controller.deleteUser = () => {
        const validator = [];

        validator.push(param('userId').isInt());

        return validator;
    };

    controller.getUser = () => {
        const validator = [];

        validator.push(param('userId').isInt());

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