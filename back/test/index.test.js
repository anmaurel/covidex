const mysql = require('mysql2');
const Variant = require('./../models/variant');
const assert = require("assert");

const Sequelize = require('sequelize');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;
const should = chai.should();
const expect = chai.expect();
const request = require('supertest');

chai.use(chaiHttp);

describe('Covidex API', () => {
    const url = 'http://localhost:9000';
    /**
     * Test DB before route testing
     */
    // before(function (done) {
    //     Variant.sequelize.sync({ force: true }).then(function () {
    //         done();
    //     });
    // });
    /**
     * Test GET route
     */
    describe('GET /variants', () => {
        it('it should GET all variants', (done) => {
            request(url)
                .get('/variants')
                .expect(200)
                .end((err, res) => {
                    if (err) done(err);
                    res.body.should.be.a('array');
                    res.body.should.be.not.empty;
                    done();
                });
        });
    });
    /**
     * Test POST route
     */
    describe('POST /variant/add', () => {
        it('it should POST a variant', (done) => {
            const variant = {
                name: 'TestMocha',
                text: 'Desc',
                onset_date: 'janvier 2025',
            };
            request(url)
                .post('/variant/add')
                .set('Content-Type', 'application/json')
                .send(variant)
                .expect(200)
                .end((err, res) => {
                    if (err) done(err);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    /**
     * Test PUT route
     */
    describe('PUT /variant/update/:id', () => {
        it('it should UPDATE a variant', (done) => {
            const variant = new Variant({
                name: 'TestMochaUp', 
                text: 'Desc', 
                onset_date: 'janvier 2025' 
            });
            variant
                .save((err, variant) => {
                    request(url)
                        .put('/variant/update' + variant.id)
                        .set('Content-Type', 'application/json')
                        .send({ name: 'TestMochaUp', text: 'DescModified', onset_date: 'décembre 2025' })
                        .expect(200)
                        .end(function (err, res) {
                            if (err) done(err);
                            res.body.should.be.a('object');
                            done();
                        });
                })
                .catch(done);
        });
    });
    /**
     * Test DELETE route
     */
    describe('DELETE /variant/delete/:id', () => {
        it('it should DELETE a variant', (done) => {
            const variant = new Variant({ 
                name: 'TestMochaDel', 
                text: 'Desc', 
                onset_date: 'janvier 2025' 
            });
            variant
                .save((err, variant) => {
                    request(url)
                        .delete('/variant/delete' + variant.id)
                        .set('Content-Type', 'application/json')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) done(err);
                            res.body.should.be.a('object');
                            done();
                        });
                })
                .catch(done);
        });
    });
});
