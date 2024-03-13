const { addMedicine, getMedicine } = require('../Services/medicine.service');

const router=require('express').Router()
router.post('/addMedicine',addMedicine);
router.get('/getMedicine',getMedicine);
module.exports=router