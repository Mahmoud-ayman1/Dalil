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
function longestCommonSubsequenceLength(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
module.exports.getFromImage=async(req,res) => {
    try {
        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);
        const response = await axios({
            method: 'POST',
            url: 'https://detect.roboflow.com/detecting-letters/12',
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
        let medi=finalResponse;
        let all=await medicineModel.find();
        let mx=0,mx2=10000;
        all.forEach(function(med,index){
            if(typeof med['name']!=="undefined"){
                let x= longestCommonSubsequenceLength(medi,med['name']);
                let w=medi.length+med['name'].length-(2*x);
                if(x>mx){
                    finalResponse=med['name'];
                    mx=x;
                    mx2=w;
                }else if(x==mx){
                    if(w<mx2){
                        finalResponse=med['name'];
                        mx=x;
                        mx2=w;
                    }
                }
            }
        })
        res.json({statue:true,data:finalResponse});
    } catch (error) {
        res.json({ statue:false,error: error.message });
    }
};
