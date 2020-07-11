module.exports = app => {
    const validator = app.validators.loginValidator;
    const controller = app.controllers.loginController;

    app.route('/api/v1/login')
        .post(validator.login(), [validator.validate, controller.login]);

    app.route('/api/v1/logout')
        .post(validator.logout(), controller.logout);
}