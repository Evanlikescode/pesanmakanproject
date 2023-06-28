const response = {
    "statusCode": {
        "created": 301,
        "fetch": 201,
        "clientError": 401,
        "notFound": 404,
        "serverError": 500,
        "forbidden": 403
    },
    "generalMessage": {
        "successStatus": "success",
        "failedStatus": "failed",
        "failedMessage": "Error"
    },
    "fieldMessage": {
        "requiredField": "all fields are required"
    },
    "userMessage": {
        "signUpSuccess": "account created",
        "signUpFailed": "account is available",
        "loginSuccess": "login succeed",
        "loginFailed": "login failed, please check your email or password",
        "logout": "Successfully logged out",
        "fetchSuccess": "Succesfully fetched",
        "fetchFailed": "Failed to fetch",
        "updateSuccess": "Successfully updated your account",
        "updateFailed": "Failed to update your account",
        "updatePasswordSuccess": "Successfully changed your password",
        "updatePasswordFailed": "Failed to change your password",
        "passwordNotMatched": "Please check your inputted password again"

    },
    "authMessage": {
        "noAuth": "Please login to your account first",
        "alreadyAuth": "Already authenticated",
        "forbiddenAuth": "You don't have any access"
    },
    "productMessage":{
        "createdSuccess": "Product created",
        "createdFailed": "Failed to create new product",
        "fetchSuccess": "Product fetched",
        "fetchFailed": "Product failed to fetch",
        "updateSuccess": "Product updated",
        "updateFailed": "Failed to update product",
        "deleteSuccess": "Product deleted",
        "deleteFailed": "Product failed to delete"
    },
    "paymentMessage":{
        "createdSuccess": "Added successfully",
        "createdFailed": "Failed to add",
        "paySuccess": "Paid successfully",
        "payFailed": "Please check your balance",
        "fetchSuccess": "Total payments fetched",
        "fetchFailed": "Total payemnts failed to fetch",
    }
}

module.exports = response