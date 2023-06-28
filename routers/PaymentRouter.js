const PaymentController = require('../controllers/payment/PaymentController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


// Method POST
router.post('/', authenticator.protect, PaymentController.create)

// Method PUT
router.put('/', authenticator.protect, PaymentController.pay)




module.exports = router