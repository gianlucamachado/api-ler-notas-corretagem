const StringBuilder = require('string-builder');

class UsersDAO {

    constructor() {}

    getAllUsers(client) {
        const queryText = new StringBuilder();
        queryText.append(' SELECT ');
        queryText.append(' users.id ');
        queryText.append(' ,users.email ');
        queryText.append(' ,users.complete_name ');
        queryText.append(' ,users.created_on ');
        queryText.append(' FROM users ');
        queryText.append(' ORDER BY id ');

        const queryParams = [];

        return client.query(queryText.toString(), queryParams).then(result => result.rows);
    }

    getByEmailPassword(client, email, password) {
        const queryText = new StringBuilder();
        queryText.append(' SELECT ');
        queryText.append(' users.id ');
        queryText.append(' ,users.email ');
        queryText.append(' ,users.complete_name ');
        queryText.append(' ,users.created_on ');
        queryText.append(' FROM users ');
        queryText.append(' WHERE ');
        queryText.append(' 1 = 1 ');
        queryText.append(' and email = $1 ');
        queryText.append(' and password = sha256($2)::text ');
        queryText.append(' ORDER BY id ');

        const queryParams = [];
        queryParams.push(email);
        queryParams.push(password);

        return client.query(queryText.toString(), queryParams).then(result => result.rows[0]);
    }

    getByEmail(client, email) {
        const queryText = new StringBuilder();
        queryText.append(' SELECT ');
        queryText.append(' users.id ');
        queryText.append(' ,users.email ');
        queryText.append(' ,users.complete_name ');
        queryText.append(' ,users.created_on ');
        queryText.append(' FROM users ');
        queryText.append(' WHERE ');
        queryText.append(' 1 = 1 ');
        queryText.append(' and email = $1 ');
        queryText.append(' ORDER BY id ');

        const queryParams = [];
        queryParams.push(email);

        return client.query(queryText.toString(), queryParams).then(result => result.rows[0]);
    }

    getById(client, userId) {
        const queryText = new StringBuilder();
        queryText.append(' SELECT ');
        queryText.append(' users.id ');
        queryText.append(' ,users.email ');
        queryText.append(' ,users.complete_name ');
        queryText.append(' ,users.created_on ');
        queryText.append(' FROM users ');
        queryText.append(' WHERE ');
        queryText.append(' 1 = 1 ');
        queryText.append(' and id = $1 ');
        queryText.append(' ORDER BY id ');

        const queryParams = [];
        queryParams.push(userId);

        return client.query(queryText.toString(), queryParams).then(result => result.rows[0]);
    }

    removeUser(userId, client) {
        const queryText = new StringBuilder();
        queryText.append(' DELETE ');
        queryText.append(' FROM users ');
        queryText.append(' WHERE ');
        queryText.append(' 1 = 1 ');
        queryText.append(' and id = $1 ');

        const queryParams = [];
        queryParams.push(userId);

        return client.query(queryText.toString(), queryParams);
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
                resolve(this.getById(client, res.rows[0].id));
            } catch (error) {
                reject(error);
            }
        });
    }

    updateUser(body, userId, client) {
        return new Promise(async (resolve, reject) => {
            const queryText = new StringBuilder();
            queryText.append(' UPDATE users set ');
            queryText.append(' complete_name = $1 ');
            queryText.append(' WHERE ');
            queryText.append(' id = $2 ');

            try {
                const queryParams = [];
                queryParams.push(body.complete_name);
                queryParams.push(userId);

                const res = await client.query(queryText.toString(), queryParams);
                resolve(this.getById(client, userId));
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = {
    UsersDAO
};