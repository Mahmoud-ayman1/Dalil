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
    const {name,usage,dosage,sideEffects,link,category,
        amount,strength,activeIngredient,alternative}=req.body;
        console.log(req.body);
        let medicine=await medicineModel.findOne({name});
        if(medicine){
            res.json({statue:false,message:"medicine already exist"});
        }else{
            await medicineModel.insertMany({name,usage,dosage,sideEffects,link,category,
                amount,strength,activeIngredient,alternative});
            res.json({statue:true,message:'done'});        
        }
}
