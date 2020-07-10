const StringBuilder = require('string-builder');

class UsersDAO {

    constructor() {}

    getAllUsers(client) {
        return client.query('SELECT * FROM users ORDER BY id ASC', []).then(result => result.rows);
    }

    getByEmailPassword(client, email, password) {
        return client.query('SELECT * FROM users WHERE email = $1 and password = sha256($2)::text', [email, password]).then(result => result.rows[0]);
    }

    getById(client, userId) {
        return client.query('SELECT * FROM users WHERE id = $1', [userId]).then(result => result.rows[0]);
    }

    removeUser(userId, client) {
        return client.query('DELETE FROM users WHERE id = $1', [userId]);
    }

    createNewUser(body, client) {
        return new Promise(async (resolve, reject) => {
            const queryText = new StringBuilder();
            queryText.append(' INSERT INTO users ( ');
            queryText.append('     id ');
            queryText.append('     ,email ');
            queryText.append('     ,complete_name ');
            queryText.append('     ,password ');
            queryText.append('     ,created_on ');
            queryText.append(' ) VALUES ( ');
            queryText.append('     DEFAULT ');
            queryText.append('     ,$1 ');
            queryText.append('     ,$2 ');
            queryText.append('     ,sha256($3) ');
            queryText.append('     ,CURRENT_DATE ');
            queryText.append(' ) RETURNING id ');

            try {
                const queryParams = [];
                queryParams.push(body.email);
                queryParams.push(body.complete_name);
                queryParams.push(body.password);

                const res = await client.query(queryText.toString(), queryParams);
                resolve(res.rows[0]);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateUser(body, userId, client) {
        return new Promise(async (resolve, reject) => {
            const queryText = new StringBuilder();
            queryText.append(' UPDATE users set ');
            queryText.append(' email = $1 ');
            queryText.append(' ,complete_name = $2 ');
            queryText.append(' WHERE ');
            queryText.append(' id = $3 ');

            try {
                const queryParams = [];
                queryParams.push(body.email);
                queryParams.push(body.complete_name);
                queryParams.push(userId);

                const res = await client.query(queryText.toString(), queryParams);
                resolve(res.rows[0]);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = {
    UsersDAO
};