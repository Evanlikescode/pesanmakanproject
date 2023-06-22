
const response = require('../general/ResponseMessage')
const responseStruct = require('../general/ResponseStructure')

class UserResponseHandlers  {
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
                responseStruct.data = {
                    "id": data.id,
                    "fullname": `${data.fullname}`,
                    "email": `${data.email}`
                }
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
                responseStruct.data = {
                    "id": data.id,
                    "fullname": `${data.fullname}`,
                    "email": `${data.email}`
                }
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
    
    static getUserResponse(err, data, result){
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
                responseStruct.data = {
                    "email": `${data.email}`,
                    "fullname": `${data.fullname}`,
                    "id": data.id
                }
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
                    "fullname": `${data[1].fullname}`,
                    "old_fullname": `${data[0].fullname}`,
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


module.exports = UserResponseHandlers