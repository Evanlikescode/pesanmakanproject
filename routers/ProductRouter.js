const ManagementController = require('../controllers/product/ManagementController')
const router = require('express').Router()
const authenticator = require('../helper/general/Authenticator')

// Method GET
router.get('/:id_seller', authenticator.protect, ManagementController.fetchBySeller)
router.get('/:id_seller/:id', authenticator.protect, ManagementController.fetchById)

// Method POST
router.post('/', [authenticator.protect, authenticator.sellerProtect], ManagementController.create)

// Method PUT
router.put('/:id', [authenticator.protect, authenticator.sellerProtect], ManagementController.update)

// Method DELETE
router.delete('/:id', [authenticator.protect, authenticator.sellerProtect], ManagementController.delete)


module.exports = router