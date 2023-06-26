
const mysql = require('../../models/methods/Seller')

class SettingsController{

    static fetchAll(req, res){
        mysql.getAllSeller((err, data) => {
            if (err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })
    }

    static fetchSeller(req, res){
        const query = {
            "seller_name": req.session.seller_name,
            "email": req.session.email
        }

        mysql.getSeller(query, (err, data) => {
            if (err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })

    }


    static updateSeller(req, res){

        const infAuth = {
            "id_seller": req.session.id_seller,
            "seller_name": req.session.seller_name,
            "email": req.session.email
        }

        const query = {
            "seller_name": req.body.seller_name
        }

        mysql.updateSeller(infAuth, query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{ 
                if(data.status == "success"){
                    req.session.seller_name = data.data.seller_name
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