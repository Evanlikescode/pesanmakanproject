const LoginController = require('../controllers/user/LoginController')
const SettingsController = require('../controllers/user/SettingsController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


// Method GET
router.post('/login', authenticator.authProtect, LoginController.login)
router.get('/logout', authenticator.protect, LoginController.logout)
router.get('/profile', [authenticator.protect, authenticator.userProtect], SettingsController.fetchUser)

// Method POST
router.post('/signup', authenticator.authProtect,LoginController.signUp)


// Method PUT
router.put('/profile', [authenticator.protect, authenticator.userProtect], SettingsController.updateUser)
router.put('/password', [authenticator.protect, authenticator.userProtect], SettingsController.changedPassword)
// Method DELETE

module.exports = router