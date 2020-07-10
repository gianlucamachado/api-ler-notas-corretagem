const pool = require('../db/pool');
const UsersDAO = require('../dao/usersDAO').UsersDAO;
const dao_users = new UsersDAO();

module.exports = app => {
    const controller = {};

    // Get all users
    controller.getUsers = async (req, res) => {
        const client = await pool.connect();
        try {
            const users = await dao_users.getAllUsers(client);
            await client.query('COMMIT');

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            await client.query('ROLLBACK');
            res.status(400).json(error);
        } finally {
            client.release();
        }
    };

    // save new user
    controller.saveUser = async (req, res) => {
        const client = await pool.connect();
        try {
            const user = await dao_users.createNewUser(req.body, client);
            await client.query('COMMIT');

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            await client.query('ROLLBACK');
            res.status(400).json(error);
        } finally {
            client.release();
        }
    };

    // remove an user
    controller.removeUser = async (req, res) => {
        const client = await pool.connect();
        try {
            const userId = req.params.userId;
            await dao_users.removeUser(userId, client);
            await client.query('COMMIT');

            res.status(200).json();
        } catch (error) {
            console.error(error);
            await client.query('ROLLBACK');
            res.status(400).json(error);
        } finally {
            client.release();
        }
    };

    // update an user
    controller.updateUser = async (req, res) => {
        const client = await pool.connect();
        try {
            const userId = req.params.userId;
            const user = await dao_users.updateUser(req.body, userId, client);
            await client.query('COMMIT');

            res.status(200).json(user);
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