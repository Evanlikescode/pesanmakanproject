const ManagementController = require('../controllers/product/ManagementController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


// router.get('/login', authenticator.authProtect, LoginController.login)
// router.get('/logout', authenticator.protect, LoginController.logout)
// router.get('/profile', authenticator.protect, SettingsController.fetchSeller)

// Method POST
router.post('/', [authenticator.protect, authenticator.sellerProtect], ManagementController.create)

// Method PUT
// router.put('/profile', authenticator.protect,SettingsController.updateSeller)
// router.put('/password',authenticator.protect, SettingsController.changedPassword)




module.exports = router