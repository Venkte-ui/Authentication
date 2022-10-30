const router=require('express').Router();
const { verify } = require('jsonwebtoken');
const { signUp }=require('../controllers/usercontroller');

router.route('/signup')
   .post(signUp);
router.route('/signup/verify')
   .post(verifyOtp);

module.exports=router;