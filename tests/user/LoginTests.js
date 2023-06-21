
const request = require('supertest')
const chai = require('chai')
const chaiHttp = require("chai-http")
const server = require('../../app')

// Assertion style
chai.should()
chai.use(chaiHttp)

let Cookies;

const data = {
    "email": "testin_z29@email.com",
    "fullname": "iidas",
    "id": "975852d2-7322-4f27-b5d9-ba0f7078307f"
}

describe('Login API', () => {

    describe("GET /login", () => {
        it("It should be logged in", (done) => {
            request(server)
                .get("/login")
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .send({
                    "email": "testin_z29@email.com",
                    "password": "123456"
                })
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.have.property('http').eql(201)
                    response.body.should.have.property('status').eql("success")
                    response.body.should.have.property('message').eql("login succeed")
                    response.body.should.have.property('data').eql(data)
                    Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    done();
                })
        })
    })
    describe("GET /logout", () => {

        it("It should be logged out", (done) => {
            var req = request(server).get('/logout');
            req.cookies = Cookies;
            req.set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.have.property('http').eql(201)
                    response.body.should.have.property('status').eql("success")
                    response.body.should.have.property('message').eql("Successfully logged out")
                    response.body.should.have.property('data').eql(null)
                    done();
                })
            });
        })
})

