const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../model/User');
const Blog = require('../model/User')
const should = chai.should();

chai.use(chaiHttp);
let token;
let id;
let blogIdd;


describe("blog test", () => {    
    describe("OPERATIONS ON blogs", ()=> {

        it("Should return all the saved blogs", (done) => {
            chai.request(app)
            .get('/api/blogs')
            .end((err,res) => {
                if(err) done(err);
                else {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("array");
                    done();

                }
            });
        });


        it("it should return 404 when return a blog without given id", (done) => {
            chai.request(app)
              .get(`/api/blog/${id}`)
              .end((err, res) => {
                if (err) done(err);
                res.should.have.status(404);
                done();
              });
          });

        it("Should return  404 when id is missing ", (done) => {
            chai.request(app)
            .post('/api/user-login')
            .send({
                email: "rwibutso@test.com",
                password: 'serge12345'
            })
            .end((err,res) => {
                chai.request(app)
                .get('/api/blog')
                .set('auth-token', `${res.body.token}`)
                .end((error, response) => {
                    if(error) done(error);
                    else {
                       response.should.have.status(404);
                       response.body.should.be.a("object");

                        done();
                    }
                }) 
            })
        });

        it("Should return 404 when creating a new blog without id", (done) => {
            chai.request(app)
            .post('/api/user-login')
            .send({
                email: "rwibutso@test.com",
                password: 'serge12345'
            }).end((err,res) => {
                chai.request(app)
                .post('/add-blog')
                .send({
                    tittle: "blogtest",
                    description: "this is blog tetsing",
                })
                .set('auth-token', `${res.body.token}`)
                .end((error, res) => {
                    res.should.have.status(404);
                    done();
                });
            });
        });

        it("It should not update a blog without being authorized", (done) => {
            chai.request(app)
              .patch('/api/edit-blog/${id}')
              .set('Authorization', 'Bearer ' + token)
              .send({
                title: "updated",
              })
              .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(401);
                done();
              });
          });

    });

});

