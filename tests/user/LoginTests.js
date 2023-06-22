const request = require('supertest')
const chai = require('chai')
const chaiHttp = require("chai-http")
const server = require('../../app')
const baseTests = new require('../baseTests')


chai.should()
chai.use(chaiHttp)



class LoginTests extends baseTests{

    profile(){
        describe("GET /profile", () => {
            it("It should be fetched profile", (done) => {
                var req = request(server).get('/profile');
                req.cookies = this.cookies;
                req.set('Accept','application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, response) => {
                        response.should.have.status(201)
                        response.body.should.have.property('http').eql(201)
                        response.body.should.have.property('status').eql("success")
                        response.body.should.have.property('message').eql("Succesfully fetched")
                        response.body.should.have.property('data').eql(this.data)
                        done();
                    })
            });
        })
    
    }

    logout(){
        describe("GET /logout", () => {
            it("It should be logged out", (done) => {
                var req = request(server).get('/logout');
                req.cookies = this.cookies;
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
    }
    
}

module.exports = LoginTests



