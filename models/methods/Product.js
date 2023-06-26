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


    static fetchBySeller(query, result){
        return con.query(`SELECT * FROM ${tableName.product} WHERE seller_id = '${query.id_seller}' `, (err, rows) => {
            if (err) {
                result(handlers.fetchResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                
                if(parser.length == 0){
                    result(null ,handlers.fetchResponse(null, null, null))
                }else{
                    const valueParser = []
                    for(let x in parser){
                        valueParser.push({
                            "id": parser[x].id,
                            "product_name": parser[x].product_name,
                            "product_desc": parser[x].product_desc,
                            "product_image": parser[x].product_image,
                            "product_price": parser[x].product_price,
                            "product_available": parser[x].product_available,
                        })
                    }
                    result(null, handlers.fetchResponse(null, valueParser, "success"))
                }
            
            }
            
               
            
        })


    }

    static fetchById(query, result){
        return con.query(`SELECT * FROM ${tableName.product} WHERE seller_id = '${query.id_seller}' AND id = ${query.id_product} `, (err, rows) => {
            if (err) {
                result(handlers.fetchResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                
                if(parser.length == 0){
                    result(null ,handlers.fetchResponse(null, null, null))
                }else{
                    const valueParser = {
                        "id": parser[0].id,
                        "product_name": parser[0].product_name,
                        "product_desc": parser[0].product_desc,
                        "product_image": parser[0].product_image,
                        "product_price": parser[0].product_price,
                        "product_available": parser[0].product_available,
                    }
                    
                    result(null, handlers.fetchResponse(null, valueParser, "success"))
                }
            
            } 
        })
    }

}

module.exports = Product