const { addMedicine, getMedicine, getMedicineByCategory, getMedicineByPrefix, getFromImage } = require('../Services/medicine.service');
const multer = require('multer');
const upload = multer(); 
const router=require('express').Router()
router.post('/addMedicine',addMedicine);
router.get('/getMedicine',getMedicine);
router.get('/getMedicineByCategory',getMedicineByCategory);
router.get('/getMedicineByPrefix',getMedicineByPrefix);
router.post('/getFromImage',upload.single('image'),getFromImage)
module.exports=router
