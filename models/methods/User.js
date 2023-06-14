const con = require('../connection')
const handlers = require('../../helper/handlers/UserResponseHandlers')
const tableName = require('../../helper/general/ListTable')

class User{
    static signUpUser(query, result){
        return con.query(`SELECT * FROM ${tableName.user} WHERE fullname = '${query.fullname}' OR email = '${query.email}'`, (err, rows) => {
            if (err) {
                result(handlers.signUpResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                console.log(query.email)
                if(query.fullname && query.password && query.email != ''){
                    if(parser.length != 0){
                        result(null ,handlers.signUpResponse(null, null, null))
                    }else{
                        con.query(`INSERT INTO  
                            ${tableName.user} (uuid_user, fullname, email, password, role_id) 
                            VALUES ('${query.id}','${query.fullname}', '${query.email}', '${query.password}', 2)
                            `
                        )
                        con.query(`SELECT * FROM ${tableName.user} WHERE email = '${query.email}' AND password = '${query.password}'`, (err, rows) => {
                            const parser = JSON.parse(JSON.stringify(rows))
                            const valueParser = {
                                "id": parser[0].uuid_user,
                                "fullname": parser[0].fullname,
                                "email": parser[0].email
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

    static loginUser(query, result){
        if(query.email == undefined && query.password == undefined){
            return result(null, handlers.loginResponse(null, null, null))
        }else{
            return con.query(`SELECT * FROM ${tableName.user} WHERE email = '${query.email}' AND password = '${query.password}' `, (err, rows) => {
                if (err) {
                    result(handlers.loginResponse(err, null, null), null)
                }
                const parser = JSON.parse(JSON.stringify(rows))
                if(parser.length == 0){
                    result(null ,handlers.loginResponse(null, null, null))
                }else{ 
                    const valueParser = {
                        "id": parser[0].uuid_user,
                        "fullname": parser[0].fullname,
                        "email": parser[0].email
                    }
                    result(null, handlers.loginResponse(null, valueParser, "success"))
                }
            })
        }
        
        
    }
    
    static logoutUser(){
        return handlers.logoutResponse()
    }

    static alreadyAuthenticated(){
        return handlers.alreadyAuthResponse()
    }

    
    static getUser(query, result){
        return con.query(`SELECT * FROM ${tableName.user} WHERE fullname = '${query.fullname}' AND email = '${query.email}'`, (err, rows) => {
            if (err) {
                result(handlers.getUserResponse(err, null, null), null)
            }
            const parser = JSON.parse(JSON.stringify(rows))
            if(parser.length == 0){
                result(null ,handlers.getUserResponse(null, null, null))
            }else{ 
                const valueParser = {
                    "id": parser[0].uuid_user,
                    "fullname": parser[0].fullname,
                    "email": parser[0].email
                }
                result(null, handlers.getUserResponse(null, valueParser, "success"))
            }
            
               
            
        })
        
    }

    static updateUser(infAuth,query, result){
        return con.query(`SELECT * FROM ${tableName.user} WHERE fullname = '${infAuth.fullname}' AND email = '${infAuth.email}'`, (err, rows) => {
            if (err) {
                result(handlers.signUpResponse(err, null, null), null)
            }else{
                const parser = JSON.parse(JSON.stringify(rows))
                if(query.fullname != ''){
                    if(parser.length == 0){ 
                        result(null ,handlers.updateResponse(null, null, null))
                    }else{
                        con.query(`SELECT  fullname FROM ${tableName.user} 
                        WHERE uuid_user != '${infAuth.id_user}' AND fullname = '${query.fullname}' `, (err,rowz) => {
                            if(JSON.parse(JSON.stringify(rowz)).length == 0 ){
                                con.query(`UPDATE   
                                    ${tableName.user} SET fullname = "${query.fullname}"
                                    WHERE email = "${infAuth.email}"`
                                )
                                result(null, handlers.updateResponse(null, query, "success"))
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
        return con.query(`SELECT * FROM ${tableName.user} WHERE email = '${infAuth.email}'`, (err, rows) => {
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
                            ${tableName.user} 
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


module.exports = User