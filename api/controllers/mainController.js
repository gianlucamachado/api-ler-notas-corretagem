const pool = require('../db/pool');

module.exports = app => {
    const controller = {};

    controller.apiMessage = async (req, res) => {
        res.status(200).json({
            message: 'Ler notas de corretagem API',
        });
    };

    return controller;
}