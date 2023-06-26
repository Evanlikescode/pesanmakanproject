
const response = require('../general/ResponseMessage')
const responseStruct = require('../general/ResponseStructure')

class SellerResponseHandlers  {
    static signUpResponse(err, data, result){
        if(err){
            responseStruct.http = response.statusCode.serverError
            responseStruct.status = response.generalMessage.failedStatus
            responseStruct.message = response.generalMessage.failedMessage
            responseStruct.data = {
                "error": err
            }
            return responseStruct
        }else{
            if(result == null){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.userMessage.signUpFailed
                responseStruct.data = null
                return responseStruct
            }else if(result == "fieldsReq"){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.fieldMessage.requiredField
                responseStruct.data = null
                return responseStruct
                
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.userMessage.signUpSuccess
                responseStruct.data = data
                return responseStruct
            }
        }
        
    }

    static noAuthResponse(){
        responseStruct.http = response.statusCode.clientError
        responseStruct.status = response.generalMessage.failedStatus
        responseStruct.message = response.authMessage.noAuth
        responseStruct.data = null
        return responseStruct
    }

    static loginResponse(err, data, result){
        if(err){
            responseStruct.http = response.statusCode.serverError
            responseStruct.status = response.generalMessage.failedStatus
            responseStruct.message = response.generalMessage.failedMessage
            responseStruct.data = {
                "error": err
            }
            return responseStruct
        }else{
            if(result == null){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.userMessage.loginFailed
                responseStruct.data = null
                return responseStruct
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.userMessage.loginSuccess
                responseStruct.data = data
                return responseStruct
            }
        }
        
    }

    static logoutResponse(){
        responseStruct.http = response.statusCode.fetch
        responseStruct.status = response.generalMessage.successStatus
        responseStruct.message = response.userMessage.logout
        responseStruct.data = null
        return responseStruct 
    }

    static alreadyAuthResponse(){
        responseStruct.http = response.statusCode.fetch
        responseStruct.status = response.generalMessage.failedStatus
        responseStruct.message = response.authMessage.alreadyAuth
        responseStruct.data = null
        return responseStruct
    }
    
    static getSellerResponse(err, data, result){
        if(err){
            responseStruct.http = response.statusCode.serverError
            responseStruct.status = response.generalMessage.failedStatus
            responseStruct.message = response.generalMessage.failedMessage
            responseStruct.data = {
                "error": err
            }
            return responseStruct
        }else{
            if(result == null){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.userMessage.fetchFailed
                responseStruct.data = null
                return responseStruct
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.userMessage.fetchSuccess
                responseStruct.data = data
                return responseStruct
            }
        }
        
    }


    static updateResponse(err, data, result){
        if(err){
            responseStruct.http = response.statusCode.serverError
            responseStruct.status = response.generalMessage.failedStatus
            responseStruct.message = response.generalMessage.failedMessage
            responseStruct.data = {
                "error": err
            }
            return responseStruct
        }else{
            if(result == null){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.userMessage.updateFailed
                responseStruct.data = null
                return responseStruct
            }else if(result == "fieldsReq"){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.fieldMessage.requiredField
                responseStruct.data = null
                return responseStruct
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.userMessage.updateSuccess
                responseStruct.data = {
                    "seller_name": `${data[1].seller_name}`,
                    "old_seller_name": `${data[0].seller_name}`,
                    "email": `${data[0].email}`
                }
                return responseStruct
            }
        }
        
    }

    static updatePasswordResponse(err, data, result){
        if(err){
            responseStruct.http = response.statusCode.serverError
            responseStruct.status = response.generalMessage.failedStatus
            responseStruct.message = response.generalMessage.failedMessage
            responseStruct.data = {
                "error": err
            }
            return responseStruct
        }else{
            if(result == null){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.userMessage.updatePasswordFailed
                responseStruct.data = null
                return responseStruct
            }else if(result == "fieldsReq"){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.fieldMessage.requiredField
                responseStruct.data = null
                return responseStruct
            }else if(result == "not_matched"){
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.failedStatus
                responseStruct.message = response.userMessage.passwordNotMatched
                responseStruct.data = null
                return responseStruct
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.userMessage.updatePasswordSuccess
                responseStruct.data = {
                    "old_password": `${data.old_password}`,
                    "new_password": `${data.new_password}`
                }
                return responseStruct
            }
        }
        
    }




}


module.exports = SellerResponseHandlers