const { addMedicine, getMedicine, getMedicineByCategory } = require('../Services/medicine.service');

const router=require('express').Router()
router.post('/addMedicine',addMedicine);
router.get('/getMedicine',getMedicine);
router.get('/getMedicineByCategory',getMedicineByCategory);
module.exports=router
