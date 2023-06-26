const LoginController = require('../controllers/seller/LoginController')
const SettingsController = require('../controllers/seller/SettingsController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')


router.get('/', authenticator.protect, SettingsController.fetchAll)
router.get('/login', authenticator.authProtect, LoginController.login)
router.get('/logout', authenticator.protect, LoginController.logout)
router.get('/profile', authenticator.protect, SettingsController.fetchSeller)
// Method POST
router.post('/signup', authenticator.authProtect,LoginController.signUp)

// Method PUT
router.put('/profile', authenticator.protect,SettingsController.updateSeller)
router.put('/password',authenticator.protect, SettingsController.changedPassword)




module.exports = router