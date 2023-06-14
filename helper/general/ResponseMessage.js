const response = {
    "statusCode": {
        "created": 301,
        "fetch": 201,
        "clientError": 401,
        "notFound": 404,
        "serverError": 500
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
        "passwordNotMatched": "Please check your input password fields again"

    },
    "authMessage": {
        "noAuth": "Please login to your account first",
        "alreadyAuth": "Already authenticated"
    }
}

module.exports = response