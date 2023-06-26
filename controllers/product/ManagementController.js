
const mysql = require('../../models/methods/Product')
class ManagementController{

    static create(req, res){

        const query = {
            'id_seller': req.session.id_seller,
            'product_name': req.body.product_name,
            'product_desc': req.body.product_desc,
            'product_image': req.body.product_image,
            'product_price': req.body.product_price,
            'product_available': req.body.product_available
        }

        mysql.create(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })
    }

    static fetchBySeller(req, res){
        const query = {
            'id_seller': req.params.id_seller,
        }
        
        mysql.fetchBySeller(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })

    }

    static fetchById(req, res){
        const query = {
            'id_seller': req.params.id_seller,
            'id_product': req.params.id
        }
        
        mysql.fetchById(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })

    }

    static update(req, res){
        const query = {
            'id_product': req.params.id,
            'id_seller': req.session.id_seller,
            'product_name': req.body.product_name,
            'product_desc': req.body.product_desc,
            'product_image': req.body.product_image,
            'product_price': req.body.product_price,
            'product_available': req.body.product_available
        }

        mysql.update(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })
    }

    static delete(req, res){
        const query = {
            'id_product': req.params.id,
            'id_seller': req.session.id_seller,
        }

        mysql.delete(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })
    }



}


module.exports = ManagementController