const medicineModel=require('../models/medicine.model')
module.exports.getMedicine=async(req,res)=>{
    const {name}=req.body;
    let medicine=await medicineModel.findOne({name});
    if(!medicine){
        res.json({statue:false,message:"medicine not found"});
    }else{
        res.json({statue:true,medicine});        
    }
}
module.exports.addMedicine=async(req,res)=>{
    const {name,usage,dosage,sideEffects,link,category,type,concentration}=req.body;
    await medicineModel.insertMany({name,usage,dosage,sideEffects,link,category,type,concentration});
    res.json({statue:true,message:'done'});
}
