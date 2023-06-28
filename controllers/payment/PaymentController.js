
const mysql = require('../../models/methods/Payment')

class Payment{

    static create(req, res){
        const query = {
            "product_id": req.body.product_id,
            "total_items": req.body.total_items,
            "total_payments": req.body.total_payments,
            "user_id": req.session.id_user,
            "seller_id": req.body.seller_id
        }
        mysql.create(query, (err, data) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })

    }

    static pay(req, res){

        const query = {
            "id_user": req.session.id_user,
            "payment_id": req.body.payment_id,
            "seller_id": req.body.seller_id,
            "product_id": req.body.product_id,
        }

        mysql.fetchTotalPayment(query, (err, data) => {
            if(err){
                res.status(500).send(err)
            }else{
                if(data.data != null){
                    const query = {
                        "id_user": req.session.id_user,
                        "payment_id": req.body.payment_id,
                        "seller_id": req.body.seller_id,
                        "product_id": req.body.product_id,
                        "total_payments": data.data.totalPayments
                    }
                    mysql.pay(query, (err, data) => {
                        if(err){
                            res.status(500).send(err)
                        }else{
                            res.status(201).send(data)
                        }
                    })
                }else{
                    res.status(201).send(data)
                }
                
            }
        })
    }

}

module.exports = Payment