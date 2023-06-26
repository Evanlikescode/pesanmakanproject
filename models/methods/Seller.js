const con = require('../connection')
const handlers = require('../../helper/handlers/SellerResponseHandlers')
const tableName = require('../../helper/general/ListTable')

class Seller{
    static signUpSeller(query, result){
        return con.query(`SELECT * FROM ${tableName.seller} WHERE seller_name = '${query.seller_name}' OR email = '${query.email}'`, (err, rows) => {
            if (err) {
                result(handlers.signUpResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(query.seller_name && query.password && query.email != ''){
                    if(parser.length != 0){
                        result(null ,handlers.signUpResponse(null, null, null))
                    }else{
                        con.query(`INSERT INTO  
                            ${tableName.seller} (uuid_seller, seller_name, email, password, role_id) 
                            VALUES ('${query.id}','${query.seller_name}', '${query.email}', '${query.password}', 2)
                            `
                        )
                        con.query(`SELECT * FROM ${tableName.seller} WHERE email = '${query.email}' AND password = '${query.password}'`, (err, rows) => {
                            const parser = JSON.parse(JSON.stringify(rows))
                            const valueParser = {
                                "email": parser[0].email,
                                "seller_name": parser[0].seller_name,
                                "id": parser[0].uuid_seller,
                                "role": parser[0].role_id
                            }                                  
                            result(null, handlers.signUpResponse(null, valueParser, "success"))    
                        })
                    }
                }else{
                    result(null, handlers.signUpResponse(null, null, "fieldsReq"))
                }
            }
            
               
            
        })
        
    }

    static loginSeller(query, result){
        if(query.email == undefined && query.password == undefined){
            return result(null, handlers.loginResponse(null, null, null))
        }else{
            return con.query(`SELECT * FROM ${tableName.seller} WHERE email = '${query.email}' AND password = '${query.password}' `, (err, rows) => {
                if (err) {
                    result(handlers.loginResponse(err, null, null), null)
                }
                const parser = JSON.parse(JSON.stringify(rows))
                if(parser.length == 0){
                    result(null ,handlers.loginResponse(null, null, null))
                }else{ 
                    const valueParser = {
                        "email": parser[0].email,
                        "seller_name": parser[0].seller_name,
                        "id": parser[0].uuid_seller,
                        "role": parser[0].role_id
                    }
                    result(null, handlers.loginResponse(null, valueParser, "success"))
                }
            })
        }
        
        
    }
    
    static logoutSeller(){
        return handlers.logoutResponse()
    }

    static alreadyAuthenticated(){
        return handlers.alreadyAuthResponse()
    }

    
    static getSeller(query, result){
        return con.query(`SELECT * FROM ${tableName.seller} WHERE seller_name = '${query.seller_name}' AND email = '${query.email}'`, (err, rows) => {
            if (err) {
                result(handlers.getSellerResponse(err, null, null), null)
            }
            const parser = JSON.parse(JSON.stringify(rows))
            if(parser.length == 0){
                result(null ,handlers.getSellerResponse(null, null, null))
            }else{ 
                const valueParser = {
                    "email": parser[0].email,
                    "seller_name": parser[0].seller_name,
                    "id": parser[0].uuid_seller
                }
                result(null, handlers.getSellerResponse(null, valueParser, "success"))
            }
            
               
            
        })
        
    }

    static getAllSeller(result){
        return con.query(`SELECT * FROM ${tableName.seller}`, (err, rows) => {
            if (err) {
                result(handlers.getSellerResponse(err, null, null), null)
            }
            const parser = JSON.parse(JSON.stringify(rows))
            if(parser.length == 0){
                result(null ,handlers.getSellerResponse(null, null, null))
            }else{ 
                const valueParser = []
                for(let x in parser){
                    valueParser.push({
                        "email": parser[x].email,
                        "seller_name": parser[x].seller_name,
                        "id": parser[x].uuid_seller
                    })
                }
                result(null, handlers.getSellerResponse(null, valueParser, "success"))
            }
            
               
            
        })
        
    }

    static updateSeller(infAuth,query, result){
        return con.query(`SELECT * FROM ${tableName.seller} WHERE seller_name = '${infAuth.seller_name}' AND email = '${infAuth.email}'`, (err, rows) => {
            if (err) {
                result(handlers.signUpResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(query.seller_name != ''){
                    if(parser.length == 0){ 
                        result(null ,handlers.updateResponse(null, null, null))
                    }else{
                        const data = [infAuth, query]
                        con.query(`SELECT  seller_name FROM ${tableName.seller} 
                        WHERE uuid_seller != '${infAuth.id_seller}' AND seller_name = '${query.seller_name}' `, (err,rowz) => {
                            if(JSON.parse(JSON.stringify(rowz)).length == 0 ){
                                con.query(`UPDATE   
                                    ${tableName.seller} SET seller_name = "${query.seller_name}"
                                    WHERE email = "${infAuth.email}"`
                                )
                                result(null, handlers.updateResponse(null, data, "success"))
                            }else{
                                result(null ,handlers.updateResponse(null, null, null))
                            }
                        })
                       
                        
                    }
                }else{
                    result(null, handlers.updateResponse(null, null, "fieldsReq"))
                }
            }
            
               
            
        })
        
    }
    static updatePassword(infAuth,query, result){
        return con.query(`SELECT * FROM ${tableName.seller} WHERE email = '${infAuth.email}'`, (err, rows) => {
            if (err) {
                result(handlers.signUpResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(query.old_password && query.new_password && query.confirm_password != ''){
                    if(parser.length == 0){ 
                        result(null ,handlers.updatePasswordResponse(null, null, null))
                    }else{
                        if(query.old_password === parser[0].password && query.new_password === query.confirm_password){
                            con.query(`UPDATE 
                            ${tableName.seller} 
                            SET password = "${query.new_password}" 
                            WHERE email = "${infAuth.email}"`)
                            result(null, handlers.updatePasswordResponse(null, query, "success"))
                        }else{
                            result(null, handlers.updatePasswordResponse(null, null, "not_matched"))
                        }
                        
                    }
                }else{
                    result(null, handlers.updatePasswordResponse(null, null, "fieldsReq"))
                }
            }
            
               
            
        })
        
    }
    

}


module.exports = Seller