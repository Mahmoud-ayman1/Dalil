const medicineModel=require('../models/medicine.model')
module.exports.getMedicine=async(req,res)=>{
    const {name}=req.body;
    let medicine=await medicineModel.findOne({name});
    res.json(medicine);
}
module.exports.addMedicine=async(req,res)=>{
    const {name,usage,dosage,sideEffects,link}=req.body;
    await medicineModel.insertMany({name,usage,dosage,sideEffects,link});
    res.json({message:'done'});
}
