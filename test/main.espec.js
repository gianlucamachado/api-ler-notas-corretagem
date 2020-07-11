const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('#### MAIN', () => {

    describe('GET main url', () => {
        it('it should GET main url', done => {
            chai.request(server)
                .get('/api/v1/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});