const PaymentController = require('../controllers/payment/PaymentController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


// Method GET
router.get('/history/seller', [authenticator.protect, authenticator.sellerProtect], PaymentController.historySeller )
router.get('/history/user', [authenticator.protect, authenticator.userProtect], PaymentController.historyUser )
router.get('/cart', [authenticator.protect, authenticator.userProtect], PaymentController.ongoingUser)

// Method POST
router.post('/', [authenticator.protect, authenticator.userProtect], PaymentController.create)

// Method PUT
router.put('/', [authenticator.protect, authenticator.userProtect], PaymentController.pay)

// Method Delete
router.delete('/', [authenticator.protect, authenticator.userProtect], PaymentController.cancelledUser)


module.exports = router