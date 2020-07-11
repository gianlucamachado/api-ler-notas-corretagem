const pool = require('../db/pool');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config().parsed;

const UsersDAO = require('../dao/usersDAO').UsersDAO;
const dao_users = new UsersDAO();

module.exports = app => {
    const controller = {};

    controller.login = async (req, res) => {
        const client = await pool.connect();
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await dao_users.getByEmailPassword(client, email, password);

            if (user) {
                const data = {};
                data.id = user.id;

                const options = {};
                options.expiresIn = 1000000;

                // create token
                const token = jwt.sign(data, dotenv.SECRET, options);

                const response = {};
                response.auth = true;
                response.token = token;

                return res.status(200).json(response);
            }

            const response = {};
            response.code = 1;
            response.message = 'invalid login';
            await client.query('COMMIT');

            res.status(500).json(response);
        } catch (error) {
            console.error(error);
            await client.query('ROLLBACK');
            res.status(400).json(error);
        } finally {
            client.release();
        }
    };

    controller.logout = async (req, res) => {
        const client = await pool.connect();
        try {
            const response = {};
            response.auth = false;
            response.token = null;
            await client.query('COMMIT');

            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            await client.query('ROLLBACK');
            res.status(400).json(error);
        } finally {
            client.release();
        }
    };

    return controller;
}