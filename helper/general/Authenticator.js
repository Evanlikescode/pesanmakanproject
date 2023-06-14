
const handlers = require('../handlers/UserResponseHandlers')

class Authenticator{
    static protect(req, res, next){
        const { authenticated } = req.session
        if(!authenticated){
            res.status(401).send(handlers.noAuthResponse())
        }else{
            next()
        }
    }
    static authProtect(req, res, next){
        const { authenticated } = req.session
        if(authenticated){
            res.status(401).send(handlers.alreadyAuthResponse())
        }else{
            next()
        }
    }
    

}


module.exports = Authenticator