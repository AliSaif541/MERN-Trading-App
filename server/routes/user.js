const router = require('express').Router();
const { registerUser, loginUser, changePassword, userProfile, updateInventory } = require('../controllers/user');

router.post('/', registerUser);
router.post('/change-password', changePassword);
router.post('/update', updateInventory);
router.post('/login', loginUser);
router.get('/user-profile', userProfile);

module.exports = router; 