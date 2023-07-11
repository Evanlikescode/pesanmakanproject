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

    static update(query, result){
        return con.query(`SELECT * FROM ${tableName.product} WHERE seller_id = '${query.id_seller}' AND id = ${query.id_product}`, (err, rows) => {
            if (err) {
                result(handlers.updateResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(parser.length == 0){ 
                    result(null ,handlers.updateResponse(null, null, null))
                }else{
                    const data = {
                        'id_product': query.id_product,
                        'id_seller': query.id_seller,
                        'product_name': query.product_name ? query.product_name : parser[0].product_name,
                        'product_desc': query.product_desc ? query.product_desc : parser[0].product_desc,
                        'product_image': query.product_image ? query.product_image : parser[0].product_image,
                        'product_price': query.product_price ? query.product_price : parser[0].product_price,
                        'product_available': query.product_available ? query.product_available : parser[0].product_available
                    }

                    con.query(`UPDATE ${tableName.product} SET product_name = '${data.product_name}', product_desc = '${data.product_desc}'
                    ,product_image = '${data.product_image}', product_price=${data.product_price}, product_available=${data.product_available} WHERE 
                    seller_id = '${data.id_seller}' AND id = ${data.id_product} `)
                    result(null, handlers.updateResponse(null, data, "success"))
                }
            }
            
               
            
        })
        
    }

    static delete(query, result){
        return con.query(`SELECT * FROM ${tableName.product} WHERE seller_id = '${query.id_seller}' AND id = ${query.id_product}`, (err, rows) => {
            if (err) {
                result(handlers.deleteResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(parser.length == 0){ 
                    result(null ,handlers.deleteResponse(null, null, null))
                }else{
                    con.query(`DELETE FROM ${tableName.product}  WHERE seller_id = '${query.id_seller}' AND id = ${query.id_product} `)
                    result(null, handlers.deleteResponse(null, query, "success"))
                }
            }
            
                
            
        })
        

    }

}

module.exports = Product