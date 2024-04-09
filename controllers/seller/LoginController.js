
const mysql = require('../../models/methods/Seller')
const {v4 : uuidv4} = require('uuid')
const QRCode = require('qrcode');

class LoginController{
    static signUp(req,res){
        const { authenticated } = req.session
        const id_seller = uuidv4()
        const path_qr = `/Users/evan258/Documents/githubProject/pesanmakanProject/pesanmakanproject/assets/${id_seller}.png`
        const query = {
            'id': id_seller,
            'seller_name': req.body.seller_name,
            'email': req.body.email,
            'password': req.body.password,
            'seller_qr': `http://localhost:3001/qrcode/${id_seller}.png`
        }

        QRCode.toFile(path_qr,id_seller, {
            errorCorrectionLevel: 'H',
        }, function(err) {
            if (err){
                console.log("QRCODE_SYSTEM_ERROR:", err)
            };
        });
        mysql.signUpSeller(query, (err, data) => {
            if(err){
               res.status(500).send(err)
            }else{
                if(data.status == "success" && !authenticated){
                    req.session.authenticated = true
                    req.session.id_seller = data.data.id
                    req.session.seller_name = data.data.seller_name
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
        mysql.loginSeller(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                if(data.status == "success" && !authenticated){
                    req.session.authenticated = true
                    req.session.id_seller = data.data.id
                    req.session.seller_name = data.data.seller_name
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

