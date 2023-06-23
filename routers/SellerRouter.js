const LoginController = require('../controllers/seller/LoginController')
// const SettingsController = require('../controllers/user/SettingsController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


router.get('/login', authenticator.authProtect, LoginController.login)
router.get('/logout', authenticator.protect, LoginController.logout)
// router.get('/profile', authenticator.protect, SettingsController.fetchUser)

// Method POST
router.post('/signup', authenticator.authProtect,LoginController.signUp)

// Method PUT
// router.put('/profile', SettingsController.updateUser)
// router.put('/password', SettingsController.changedPassword)




module.exports = router