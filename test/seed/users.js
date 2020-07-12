const faker = require('faker');
faker.locale = 'pt_BR';

const changeName = (user) => {
    user.complete_name = faker.name.findName();
    return user;
};

const getUser = () => {
    const user = {};
    const len_password = Math.floor(Math.random() * 5) + 6;

    user.id = 0;
    user.email = faker.internet.email();
    user.complete_name = faker.name.findName();
    user.password = faker.internet.password(len_password);

    return user;
};

module.exports = {
    getUser,
    changeName,
};