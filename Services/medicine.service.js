const axios = require('axios');
const FormData = require('form-data');
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
module.exports.getMedicineByCategory=async(req,res)=>{
    const {category}=req.body;
    let medicine=await medicineModel.find({category});
    res.json({statue:true,medicine})
}

module.exports.getMedicineByPrefix=async(req,res)=>{
    const {prefix}=req.body;
    let medicines=await medicineModel.find({name:{$regex:new RegExp(`^${prefix}`)}});
    res.json({statue:true,data:medicines});
}
module.exports.getFromImage=async(req,res) => {
    try {
        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);
        const response = await axios({
            method: 'POST',
            url: 'https://detect.roboflow.com/detecting-letters/9',
            params: {
                api_key: 'K0VfldUkYwC5kYI8Ulv0'
            },
            data: formData,
            headers: {
                ...formData.getHeaders()
            }
        });
        let semiFinalResponse=[];
        let arr=response.data.predictions;
        arr.forEach(function(dic, index) {
            semiFinalResponse.push([dic['x'],dic['class']]);
        });
        semiFinalResponse.sort();
        let finalResponse="";
        semiFinalResponse.forEach(function(dic, index) {
            finalResponse+=dic[1];
        });
        res.json({statue:true,data:finalResponse});
    } catch (error) {
        res.json({ statue:false,error: error.message });
    }
};
