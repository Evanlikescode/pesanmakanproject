
const mysql = require('../../models/methods/User')
const {v4 : uuidv4} = require('uuid')

class LoginController{
    static signUp(req,res){
        const { authenticated } = req.session
        const query = {
            'id': uuidv4(),
            'fullname': req.body.fullname,
            'email': req.body.email,
            'password': req.body.password
        }
        mysql.signUpUser(query, (err, data) => {
            if(err){
               res.status(500).send(err)
            }else{
                if(data.status == "success" && !authenticated){
                    req.session.authenticated = true
                    req.session.id_user = data.data.id
                    req.session.fullname = data.data.fullname
                    req.session.email = data.data.email
                    req.session.id_role = data.data.role
                }
                res.status(201).send(data)
            }
        })
    }

    static login(req,res){
        const { authenticated } = req.session
        const query = {
            'email': req.body.email,
            'password': req.body.password
        }
        mysql.loginUser(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                if(data.status == "success" && !authenticated){
                    req.session.authenticated = true
                    req.session.id_user = data.data.id
                    req.session.fullname = data.data.fullname
                    req.session.email = data.data.email
                    req.session.id_role = data.data.role
                    res.status(201).send(data)
                }else if(data.status == "failed"){
                    if(req.session != undefined){
                        req.session.destroy()
                    }
                    res.status(201).send(data)
                }else{
                    res.status(201).send(mysql.alreadyAuthenticated())
                }

            }
        })
    
    }

    static logout(req, res){
        req.session.destroy(() => {
            res.status(201).send(mysql.logoutUser())
        })
    }

}


module.exports = LoginController

