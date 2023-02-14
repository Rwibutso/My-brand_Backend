const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')
const chai = require('chai');
const User = require('../model/User');
const chaiHttp = require('chai-http');
const { jwt } = require("jsonwebtoken");

const should = chai.should();

let id;

chai.use(chaiHttp);



describe("USER REGISTRATION", () => {
  before((done) => {
    const user = new User({
      firstname: "Serge",
      lastname: "Rwibutso",
      email: "rwibutso@test.com",
      password: 'serge12345',
    });
    user.save((err,user) => {
      done();
    })
  });
  after((done) => {
    User.collection
    .drop()
    .then(() =>{

    }).catch(() => {
        console.warn("Collection not exist");
    });
    done();
  });

  it("Should register a new user", (done) => {
    chai.request(app)
    .post('/api/user-register')
    .send({
      firstname: "Mugabo",
      lastname: "Gael",
      email: "mugabo@example.com",
      password: 'mugabo12345',
    })
    .end((err,res) => {
        if(err) done(err);
        else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          }
    })
  });

  it('Should return 400 when  firstname is missing', (done) => {
    chai.request(app)
    .post('/api/user-register')
    .send({
      lastname: "Gael",
      email: "mugabo@example.com",
      password: 'mugabo12345',
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it('Should return 400 when  lastname is missing', (done) => {
    chai.request(app)
    .post('/api/user-register')
    .send({
      firstname: "Mugabo",
      email: "mugabo@example.com",
      password: 'mugabo12345',
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it('Should return 400 when  email is missing', (done) => {
    chai.request(app)
    .post('/api/user-register')
    .send({
      firstname: "Mugabo",
      lastname: "Gael",
      password: 'mugabo12345',
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it('Should return 400 when  password is missing', (done) => {
    chai.request(app)
    .post('/api/user-register')
    .send({
      firstname: "Mugabo",
      lastname: "Gael",
      email: "mugabo@example.com",
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it('Should return 404 when email is already registered', (done) => {
    chai.request(app)
    .post('/api/user-register')
    .send({
      firstname: "Serge",
      lastname: "Rwibutso",
      email: "rwibutso@test.com",
      password: 'serge12345',
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it("Should list ALL USERS on GET /api/user", (done) => {
    chai.request(app)
    .get('/api/users')
    .end((err,res) => {
        if(err) done(err);
        else {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            done()
          }
    });
  });

})

describe("USER LOGIN", () => {
  let token;
  it("should login and return a token", (done) => {
    chai.request(app)
    .post('/api/user-login')
    .send({
      email: "rwibutso@test.com",
      password: 'serge12345',
    })
    .end((err, res) => {
      if (err) done(err);
      else {
        res.should.have.status(400);
        res.body.should.be.an("object");
        token = res.body;
        done();
      }
    })
  });
  
 it('Should return 400 when email is missing', (done) => {
    chai.request(app)
    .post('/api/user-login')
    .send({
      password: 'serge12345',
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it('Should return 400 when password is missing', (done) => {
    chai.request(app)
    .post('/api/user-login')
    .send({
      email: "rwibutso@test.com",
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });

  it('Should return 404 when email or password is wrong', (done) => {
    chai.request(app)
    .post('/api/user-login')
    .send({
      email: "rwgyutest.com",
      password: 'se45',
    })
    .end((err,res) => {
      if(err) done(err);
      else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        }
    })
    
  });
  
  
});


// // beforeAll(async () => {
// //     mongoose.set('strictQuery', false);
// //     await mongoose.connect(process.env.DB_CONNECT)
// //         .then(() => console.log('connected'))

// // });

// // afterAll(async () => {

// //     await mongoose.disconnect()
// //     await mongoose.connection.close()
// // })


// describe("User authentication endpoints", () => {
//     it("should register a new user", async () => {
//       const res = await request(app)
//         .post("/api/user-register")
//         .send({
//           firstname: "serge",
//           lastname: "Rwibutso",
//           email: "serge@test.com",
//           password: 'serge123',
//         });
  
//       expect(res.statusCode).toEqual(400);
//     });

//     it('Should return 400 when  firstname is missing', async () => {
//         const user = await request(app).post('api/user-register').send({
//             lastname: "Rwibutso",
//             email: "serge@test.com",
//             password: 'serge123',
//         })
//         expect(user.status).toBe(400);
      
//     })  
// });



// test("should return a success message ", async () => {
//   await request(app).post("/api/user-register")
//   .send({
//     firstname: "serge",
//     lastname: "Rwibutso",
//     email: "rwibutso@example.com",
//     password: 'serge12345',
//   })
//   .expect(400)

// });




// describe("User registration", () => {
//   it("should return a success message when a user registers with valid data", done => {
//     chai
//       .request(server)
//       .post("/api/user-register")
//       .send({
//         firstname: "serge",
//         lastname: "Rwibutso",
//         email: "serge@test.com",
//         password: 'serge123',
//       })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property("message", "User created successfully");
//         done();
//       });
//   });

// });
















// beforeAll(async () => {
//     mongoose.set('strictQuery', false);
//     await mongoose.connect(process.env.DB_CONNECT)
//         .then(() => console.log('connected'))

// });

// afterAll(async () => {

//     await mongoose.disconnect()
//     await mongoose.connection.close()
// })


// describe("User authentication endpoints", () => {
//     it("should register a new user", async () => {
//       const res = await request(app)
//         .post("/api/user-register")
//         .send({
//           firstname: "serge",
//           lastname: "Rwibutso",
//           email: "serge@test.com",
//           password: 'serge123',
//         });
  
//       expect(res.statusCode).toEqual(201);
//       expect(res.body).toHaveProperty("message", "User created successfully");
//     });
// });

// describe('Create a user', () => {
//     beforeAll(async () => {
//         await Users.deleteMany({}, { maxTimeMS: 20000 })
//     }, 20000)

//     it('should Register a user', async () => {
//         const user = await supertest(app).post('/api/user-register').send({
//             firstname: "serge",
//             lastname: "Rwibutso",
//             email: "serge@test.com",
//             password: 'serge123',
//         })
//         expect(user.status).toBe(201)

//     })
//     it('Should return 400 when  firstname is missing', async () => {
//         const user = await supertest(app).post('api/user-register').send({
//             lastname: "Rwibutso",
//             email: "serge@test.com",
//             password: 'serge123',
//         })
//         expect(user.status).toBe(400)

//     })
//     it('Should return 400 when nlastame is missing', async () => {
//         const user = await supertest(app).post('api/user-register').send({
//             firstname: "serge",
//             email: "serge@test.com",
//             password: 'serge123',
//         })
//         expect(user.status).toBe(400)

//     })
//     it('Should return 400 when an Email is missing', async () => {
//         const user = await supertest(app).post('api/user-register').send({
//             firstname: "serge",
//             lastname: "Rwibutso",
//             password: 'serge123',
//         })
//         expect(user.status).toBe(400)

//     })
//     it('Should return 400 when a password is missing', async () => {
//         const user = await supertest(app).post('api/user-register').send({
//             firstname: "serge",
//             lastname: "Rwibutso",
//             email: "serge@test.com",
//         })
//         expect(user.status).toBe(400)

//     })
//     it('should return 404 if email is already registered', async () => {
//         const user = await supertest(app).post('api/user-register').send({
//             firstname: "serge",
//             lastname: "Rwibutso",
//             email: "serge@test.com",
//             password: 'serge123',
//         })
//         expect(user.body.message).toContain('Email already registered..')
//     })
// })

// // describe('AUTHENTICATION & AUTHORIZATION', () => {
// //     describe('login test', () => {
// //         it('Return 400 if password is missing', async () => {
// //             const res = await supertest(app).post('api/user-login').send({
// //                 email: 'serge@test.com',
// //             })
// //             expect(res.status).toBe(400)
// //         })
// //         it('Return 400 if email is missing', async () => {
// //             const res = await supertest(app).post('api/user-login').send({
// //                 password: 'serge123',
// //             })
// //             expect(res.status).toBe(400)
// //         })
// //         it('Return 400 if email or password is wrong', async () => {
// //             const res = await supertest(app).post('api/user-login').send({
// //                 email: 'cserge@test.com',
// //                 password: 'serge123'
// //             })
// //             expect(res.status).toBe(400)
// //         })
// //         it('Return 200 when login is successfull', async () => {
// //             const res = await supertest(app).post('api/user-login').send({
// //                 email: 'serge@test.com',
// //                 password: 'serge123'
// //             })
// //             // console.log(res.body)
// //             expect(res.status).toBe(200)
// //             expect(res.body.message).toContain('success')
// //         })
// //     })
// //     describe('Should get all user as authenticated user', () => {
// //         let token
// //         beforeAll(async () => {
// //             const res = await supertest(app).post('api/user-login').send({
// //                 email: "serge@test.com",
// //                 password: "serge123"
// //             })
// //             token = res.body.token
// //         })
// //         it('Return all users and 200', async () => {
// //             const res = await supertest(app).get('api/user-login').set('Authorization', "Bearer " + token)
// //             expect(res.status).toBe(200)
// //             expect(res.body.message).toContain('success')
// //         })
// //     })
// // })





