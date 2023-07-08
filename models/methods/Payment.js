const con = require('../connection')
const handlers = require('../../helper/handlers/PaymentResponseHandlers')
const tableName = require('../../helper/general/ListTable')

class Payment{

    static create(query, result){
        return con.query(`SELECT product_available 
        FROM ${tableName.product} WHERE id = ${query.product_id}`, (err, rows) => {
            if (err) {
                result(handlers.createResponse(err, null, null), null)
            }else{ 
                const parser = JSON.parse(JSON.stringify(rows))
                if(parser[0].product_available < query.total_items){
                    result(null,handlers.createResponse(null, null, null))
                }else{
                    con.query(`INSERT INTO ${tableName.payment} 
                    (product_id, total_items, total_payments, user_id, seller_id, status_id)
                    VALUES (${query.product_id}, ${query.total_items}, ${query.total_payments}, '${query.user_id}', '${query.seller_id}', 1001)`)

                    const subProdAvail = parser[0].product_available - query.total_items

                    con.query(`UPDATE ${tableName.product} 
                    SET product_available = ${subProdAvail} WHERE id = ${query.product_id}`)

                    result(null,handlers.createResponse(null, null, "success"))
                }
            }
        })
        
    }

    static fetchTotalPayment(query, result){
        return con.query(`SELECT total_payments, total_items FROM ${tableName.payment}
            WHERE id = ${query.payment_id}
            AND user_id = '${query.id_user}' 
            AND seller_id = '${query.seller_id}'
            AND product_id = ${query.product_id}
            AND status_id = 1001`, (err, rows) => {
                if(err){
                    result(handlers.fetchResponse(err, null, null), null)
                }else{
                    const parser = JSON.parse(JSON.stringify(rows))
                    if(parser.length != 0){
                        const valueParser = {
                            "totalPayments": parser[0].total_payments,
                            "totalItems": parser[0].total_items
                        }
                        result(null, handlers.fetchResponse(null, valueParser, "success"))
                    }else{
                        result(null, handlers.fetchResponse(null, null, null))
                    }
                    
                }
                    
                
        })
    }

    static pay(query, result){
      
        return con.query(`SELECT balance FROM ${tableName.user} 
        WHERE uuid_user = '${query.id_user}'`, (err, rows) => {
            if(err){
                result(handlers.payResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(parser[0].balance != 0 && parser[0].balance > query.total_payments){
                    con.query(`UPDATE ${tableName.payment} SET status_id = 1002 WHERE 
                    id = ${query.payment_id}
                    AND user_id = '${query.id_user}' 
                    AND seller_id = '${query.seller_id}'
                    AND product_id = ${query.product_id}
                    AND status_id = 1001`)

                    const balances_user = parser[0].balance - query.total_payments
                    con.query(`UPDATE ${tableName.user} 
                    SET balance = ${balances_user} WHERE uuid_user = '${query.id_user}'
                    `)

                    con.query(`SELECT balance FROM ${tableName.seller} WHERE uuid_seller = '${query.seller_id}'`, (err, rows) => {
                        const parser = JSON.parse(JSON.stringify(rows))
                        const balances_seller = parser[0].balance + query.total_payments
                        con.query(`UPDATE ${tableName.seller} 
                        SET balance = ${balances_seller} WHERE uuid_seller = '${query.seller_id}'
                        `)

                    })

                    result(null ,handlers.payResponse(null, null, "success"))

                }
                else{
                    
                    con.query(`UPDATE payments SET status_id = 1004 WHERE 
                    id = ${query.payment_id}
                    AND user_id = '${query.id_user}' 
                    AND seller_id = '${query.seller_id}'
                    AND product_id = ${query.product_id}
                    AND status_id = 1001 `)

                    con.query(`SELECT product_available 
                    FROM ${tableName.product} WHERE id = ${query.product_id}`, (err, rows) => {
                        if(err){
                            result(handlers.payResponse(err, null, null), null)
                        }else{
                            const parser = JSON.parse(JSON.stringify(rows))
                            const addProdAvail = parser[0].product_available + query.total_items
                            con.query(`UPDATE ${tableName.product} 
                            SET product_available = ${addProdAvail} WHERE id = ${query.product_id}`)
                        }
                    })

                    
                    result(null ,handlers.payResponse(null, null, null))
                }
            }
        })
    }


    static fetchHistory(query, result){
        let paymentSub = "payments.user_id"
        if(query.seller_id != undefined){
            paymentSub = "payments.seller_id"
            query.user_id = query.seller_id
        }
        return con.query(`SELECT payments.*, products.product_name, products.product_desc, products.product_image, products.product_price, products.seller_id 
        FROM payments JOIN products 
        ON payments.product_id = products.id WHERE ${paymentSub} = '${query.user_id}' AND payments.status_id = 1002`, (err, rows) => {
            const parser = JSON.parse(JSON.stringify(rows))
            const valueParser = []
            for(let x in parser){
                valueParser.push({
                    "payment_id": parser[x].id,
                    "product_id": parser[x].product_id,
                    "seller_id": parser[x].seller_id,
                    "product_name": parser[x].product_name,
                    "product_desc": parser[x].product_desc,
                    "product_image": parser[x].product_image,
                    "product_price": parser[x].product_price,
                    "total_items": parser[x].total_items,
                    "total_payments": parser[x].total_payments
                })
            }
            result(null, handlers.fetchResponse(null, valueParser, "success"))

        })
    }

    static fetchOngoing(query, result){
        return con.query(`SELECT payments.*, products.product_name, products.product_desc, products.product_image, products.product_price, products.seller_id 
        FROM payments JOIN products 
        ON payments.product_id = products.id WHERE payments.user_id = '${query.user_id}' AND payments.status_id = 1001`, (err, rows) => {
            const parser = JSON.parse(JSON.stringify(rows))
            const valueParser = []
            for(let x in parser){
                valueParser.push({
                    "payment_id": parser[x].id,
                    "product_id": parser[x].product_id,
                    "seller_id": parser[x].seller_id,
                    "product_name": parser[x].product_name,
                    "product_desc": parser[x].product_desc,
                    "product_image": parser[x].product_image,
                    "product_price": parser[x].product_price,
                    "total_items": parser[x].total_items,
                    "total_payments": parser[x].total_payments
                })
            }
            result(null, handlers.fetchResponse(null, valueParser, "success"))

        })
    }


}

module.exports = Payment