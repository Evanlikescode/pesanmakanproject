
const response = require('../general/ResponseMessage')
const responseStruct = require('../general/ResponseStructure')

class PaymentResponseHandlers  {
    static createResponse(err, data, result){
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
                responseStruct.message = response.paymentMessage.createdFailed
                responseStruct.data = null
                return responseStruct
                
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.paymentMessage.createdSuccess
                responseStruct.data = null
                return responseStruct
            }
        }
        
    }

    static fetchResponse(err, data, result){
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
                responseStruct.message = response.paymentMessage.fetchFailed
                responseStruct.data = null
                return responseStruct
                
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.paymentMessage.fetchSuccess
                responseStruct.data = data
                return responseStruct
            }
        }
        
    }

    static payResponse(err, data, result){
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
                responseStruct.message = response.paymentMessage.payFailed
                responseStruct.data = null
                return responseStruct
                
            }else{
                responseStruct.http = response.statusCode.fetch
                responseStruct.status = response.generalMessage.successStatus
                responseStruct.message = response.paymentMessage.paySuccess
                responseStruct.data = null
                return responseStruct
            }
        }
        
    }


}


module.exports = PaymentResponseHandlers