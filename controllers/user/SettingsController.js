
const mysql = require('../../models/methods/User')

class SettingsController{


    static fetchUser(req, res){
        
        const query = {
            "fullname": req.session.fullname,
            "email": req.session.email
        }

        mysql.getUser(query, (err, data) => {
            if (err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })

    }


    static updateUser(req, res){

        const infAuth = {
            "id_user": req.session.id_user,
            "fullname": req.session.fullname,
            "email": req.session.email
        }

        const query = {
            "fullname": req.body.fullname
        }

        mysql.updateUser(infAuth, query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{ 
                if(data.status == "success"){
                    req.session.fullname = data.fullname
                }
                res.status(201).send(data)
            }
        })

    }


    static changedPassword(req, res){
        const infAuth = {
            "email": req.session.email
        }

        const query = {
            "old_password": req.body.old_password,
            "new_password": req.body.new_password,
            "confirm_password": req.body.confirm_password
        }

        mysql.updatePassword(infAuth, query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })
    }

}

module.exports = SettingsController