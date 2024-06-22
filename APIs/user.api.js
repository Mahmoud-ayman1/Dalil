const { signUp, signIn, verifyEmail, resetPassword, addToHistory, getHistory } = require('../Services/user.service');
const { userValidate } = require('../middleware/validation/user.validation');

const router=require('express').Router();

router.post('/signUp',userValidate,signUp);
router.post('/signIn',signIn);
router.get('/verifyEmail/:token',verifyEmail);
router.put('/resetPassword',resetPassword);
router.post('/addToHistory',addToHistory);
router.get('/getHistory',getHistory);
module.exports=router;
