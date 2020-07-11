const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const token = require('./seed/seed').token;
chai.use(chaiHttp);

describe('#### USERS', () => {

    describe('GET ALL USERS', () => {
        it('should get all users', done => {
            chai.request(server)
                .get('/api/v1/users')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});