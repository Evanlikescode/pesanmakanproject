const PaymentController = require('../controllers/payment/PaymentController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


// Method GET
router.get('/history/seller', [authenticator.protect, authenticator.sellerProtect], PaymentController.historySeller )
router.get('/history/user', authenticator.protect, PaymentController.historyUser )

// Method POST
router.post('/', authenticator.protect, PaymentController.create)

// Method PUT
router.put('/', authenticator.protect, PaymentController.pay)




module.exports = router