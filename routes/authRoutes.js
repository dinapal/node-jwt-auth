const router = require('express').Router();
const authController = require('../controllers/authController');



router.route('/signup').get(authController.SignUpGet).post(authController.SignUpPost)
router.route('/login').get(authController.loginGet).post(authController.loginPost);
router.route('/logout').get(authController.logOutGet)

module.exports = router;