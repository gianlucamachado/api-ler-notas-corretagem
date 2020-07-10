module.exports = app => {
    const auth = app.controllers.authenticationController;
    const controller = app.controllers.usersController;

    app.use(auth.verifyJWT).route('/api/v1/users')
        .get(controller.getUsers)
        .post(controller.saveUser);

    app.use(auth.verifyJWT).route('/api/v1/users/:userId')
        .delete(controller.removeUser)
        .put(controller.updateUser);

}