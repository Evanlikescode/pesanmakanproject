
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

    static sellerProtect(req, res, next){
        if(req.session.id_role != 1){
            res.status(403).send(handlers.forbiddenResponse())
        }else{
            next()
        }
    }

    static userProtect(req, res, next){
        if(req.session.id_role != 2){
            res.status(403).send(handlers.forbiddenResponse())
        }else{
            next()
        }
    }
    

}


module.exports = Authenticator