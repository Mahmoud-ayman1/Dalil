const { signUp, signIn, verifyEmail, resetPassword } = require('../Services/user.service');
const { userValidate } = require('../middleware/validation/user.validation');

const router=require('express').Router();

router.post('/signUp',userValidate,signUp);
router.post('/signIn',signIn);
router.get('/verifyEmail/:token',verifyEmail);
router.put('/resetPassword',resetPassword);
module.exports=router;
