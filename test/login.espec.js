const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const token = require('./seed/token').token;
let user = require('./seed/users').getUser();
const password = user.password;

describe('#### LOGIN', () => {

    describe('INSERT NEW USER', () => {
        it("Should add a new user in DB", done => {
            chai.request(server)
                .post('/api/v1/users')
                .send(user)
                .end((err, res) => {
                    user.id = res.body.id;
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('DO LOGIN', () => {
        it('should do login with email and password', done => {
            user.password = password;
            chai.request(server)
                .post('/api/v1/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.have.property('auth');
                    res.body.should.have.property('token');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('DELETE USER', () => {
        it('should delete an user by id', done => {
            chai.request(server)
                .delete(`/api/v1/users/${user.id}`)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('DO LOGOUT', () => {
        it('should do logout', done => {
            chai.request(server)
                .post('/api/v1/logout')
                .end((err, res) => {
                    res.body.should.have.property('auth');
                    res.body.should.have.property('token');
                    res.should.have.status(200);
                    done();
                });
        });
    });

});