module.exports = app => {
    const auth = app.helpers.authentication;
    const controller = app.controllers.usersController;
    const validator = app.validators.usersValidator;

    app.use(auth.verifyJWT).route('/api/v1/users')
        .get(controller.getUsers)
        .post(validator.createUser(), [validator.validate, controller.saveUser]);

    app.use(auth.verifyJWT).route('/api/v1/users/:userId')
        .get(validator.getUser(), [validator.validate, controller.getUser])
        .delete(validator.deleteUser(), [validator.validate, controller.removeUser])
        .put(validator.updateUser(), [validator.validate, controller.updateUser]);

}