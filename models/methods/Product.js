const con = require('../connection')
const handlers = require('../../helper/handlers/ProductResponseHandlers')
const tableName = require('../../helper/general/ListTable')

class Product{

    static create(query, result){
        return con.query(`SELECT * FROM ${tableName.product} WHERE seller_id = '${query.id_seller}' AND product_name = '${query.product_name}'`, (err, rows) => {
            if (err) {
                result(handlers.createResponse(err, null, null), null)
            }else{

                const parser = JSON.parse(JSON.stringify(rows))
                if(query.product_name && query.product_price && query.product_available && query.id_seller != ''){
                    if(parser.length != 0){
                        result(null ,handlers.createResponse(null, null, null))
                    }else{
                        con.query(`INSERT INTO  
                            ${tableName.product} (product_name, product_desc, product_image, product_price, product_available, seller_id) 
                            VALUES ('${query.product_name}','${query.product_desc}', '${query.product_image}', ${query.product_price}, ${query.product_available}, '${query.id_seller}')
                            `
                        )
                        result(null, handlers.createResponse(null, query, "success"))   
                    }
                }else{
                    result(null, handlers.createResponse(null, null, "fieldsReq"))
                }
            }
            
               
            
        })
    }



}

module.exports = Product