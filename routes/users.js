const router = require('express').Router();
const { getUserById, updateUser } = require('../controllers/users');
const { userInfoValidate } = require('../middlewares/validation');

router.get('/me', getUserById);
router.patch('/me', userInfoValidate, updateUser);

module.exports = router;
