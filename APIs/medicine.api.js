const { addMedicine, getMedicine, getMedicineByCategory, getMedicineByPrefix } = require('../Services/medicine.service');

const router=require('express').Router()
router.post('/addMedicine',addMedicine);
router.get('/getMedicine',getMedicine);
router.get('/getMedicineByCategory',getMedicineByCategory);
router.get('/getMedicineByPrefix',getMedicineByPrefix);
module.exports=router
