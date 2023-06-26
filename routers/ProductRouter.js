const ManagementController = require('../controllers/product/ManagementController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')

// Method GET
router.get('/all', [authenticator.protect, authenticator.sellerProtect], ManagementController.fetch)


// Method POST
router.post('/', [authenticator.protect, authenticator.sellerProtect], ManagementController.create)

// Method PUT
// router.put('/profile', authenticator.protect,SettingsController.updateSeller)
// router.put('/password',authenticator.protect, SettingsController.changedPassword)




module.exports = router