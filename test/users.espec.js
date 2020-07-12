const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const token = require('./seed/token').token;
const changeName = require('./seed/users').changeName;
let user = require('./seed/users').getUser();

describe('#### USERS', () => {

    describe('GET ALL USERS', () => {
        it('should get all users', done => {
            chai.request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('INSERT NEW USER', () => {
        it("Should add a new user in DB", done => {
            chai.request(server)
                .post('/api/v1/users')
                .send(user)
                .end((err, res) => {
                    user = res.body;
                    user.should.be.an('object');
                    user.should.have.property('id');
                    user.should.have.property('complete_name');
                    user.should.have.property('email');
                    user.should.have.property('created_on');
                    user.should.not.have.property('password');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('GET USER', () => {
        it('should get an user by id', done => {
            chai.request(server)
                .get(`/api/v1/users/${user.id}`)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    user = res.body;
                    user.should.be.an('object');
                    user.should.have.property('id');
                    user.should.have.property('complete_name');
                    user.should.have.property('email');
                    user.should.have.property('created_on');
                    user.should.not.have.property('password');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('UPDATE USER', () => {
        it('should update an user by id', done => {
            chai.request(server)
                .put(`/api/v1/users/${user.id}`)
                .set('Authorization', 'Bearer ' + token)
                .send(changeName(user))
                .end((err, res) => {
                    user = res.body;
                    user.should.be.an('object');
                    user.should.have.property('id');
                    user.should.have.property('complete_name');
                    user.should.have.property('email');
                    user.should.have.property('created_on');
                    user.should.not.have.property('password');
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

});