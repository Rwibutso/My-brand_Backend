const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')
const chai = require('chai');
const User = require('../model/User');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

let id;

let token;

//create message test
describe("Create Message", () => {
   it("should create a new message", (done) => {
       chai.request(app)
       .post("/api/add-messages")
       .send({
         firstname: "Serge",
         lastname: "Rwibutso",
         email: "rwibutso@example.com",
         message: "this the testing message",
        })
       .end((err, res) => {
            if (err) done(err);
            else {
              id = res.body._id;
              res.should.have.status(200);
              done();
           }
       });
    });
});

describe("Get all messages by checktoken first", () => {
    it("It Should get all messages", (done) => {
        chai.request(app)
        .get("/api/messages")
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          done();
        });
    });
});

describe("Delete single message by id", () => {
    it("It should delete a single message by id", (done) => {
       chai.request(app)
       .delete(`/api/del-messages/${id}`)
       .set("auth-token", `${token}`)
       .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(404);
          done();
        });
    });
});