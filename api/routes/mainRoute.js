module.exports = app => {
    const controller = app.controllers.mainController;

    app.route('/api/v1/')
        .get(controller.apiMessage);

}