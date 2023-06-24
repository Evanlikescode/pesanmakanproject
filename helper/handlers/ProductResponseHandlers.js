
const response = require('../general/ResponseMessage')
const responseStruct = require('../general/ResponseStructure')

class ProductResponseHandlers  {
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
                responseStruct.message = response.productMessage.createdFailed
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
                responseStruct.message = response.productMessage.createdSuccess
                responseStruct.data = {
                    'id_seller': data.id_seller,
                    'product_name': data.product_name,
                    'product_desc': data.product_desc,
                    'product_image': data.product_image,
                    'product_price': data.product_price,
                    'product_available': data.product_available
                }
                return responseStruct
            }
        }
        
    }





}


module.exports = ProductResponseHandlers