const con = require('../connection')
const handlers = require('../../helper/handlers/PaymentResponseHandlers')
const tableName = require('../../helper/general/ListTable')

class Payment{

    static create(query, result){
        return con.query(`INSERT INTO ${tableName.payment} 
            (product_id, total_items, total_payments, user_id, seller_id, status_id)
            VALUES (${query.product_id}, ${query.total_items}, ${query.total_payments}, '${query.user_id}', '${query.seller_id}', 1001)`, (err, rows) => {
                if (err) {
                    result(handlers.createResponse(err, null, null), null)
                }else{ 
                    result(null,handlers.createResponse(null, null, "success"))
                }
        })
    }

    static fetchTotalPayment(query, result){
        return con.query(`SELECT total_payments FROM ${tableName.payment}
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
                            "totalPayments": parser[0].total_payments
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
                if(parser[0].balance != 0 ){
                    if(parser[0].balance < query.total_payments){
                        result(null ,handlers.payResponse(null, null, null))
                    }else{
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
                    
                }
                else{
                    result(null ,handlers.payResponse(null, null, null))
                }
            }
        })
    }


}

module.exports = Payment