const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const Joi=require('joi');
var jwt = require('jsonwebtoken');
const { sendEmail } = require('../email/user.email');
module.exports.signUp=async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
        res.json({statue:false,message:"user already exist"});
    }else{
        let token=jwt.sign({email},'dlil');
        sendEmail({email,token,name});
        bcrypt.hash(password,4,async function(err,hash){
            await userModel.insertMany({name,email,password:hash});
            res.json({statue:true,message:"signUp done successfully, Please confirm your Email"});
        })
    }
}
module.exports.signIn=async(req,res)=>{
    const {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
        let match=await bcrypt.compare(password,user.password);
        if(match){
            if(user.emailConfirm){
                res.json({statue:true,message:"signIn done successfully",name:user.name})
            }else{
                res.json({statue:false,message:"please verify you account first"});
            }
        }else{
            res.json({statue:false,message:"incorrect Password"})
        }
    }else{
        res.json({statue:false,message:"user dosn't exist"})
    }
}
module.exports.verifyEmail=async(req,res)=>{
    const {token}=req.params;
    jwt.verify(token,'dlil',async(err,decoded)=>{
        if(err){
            res.json(err);
        }else{
            let user=await userModel.findOne({email:decoded.email});
            if(user){
                await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true});
                res.json({statue:true,message:'verified'});
            }else{
                res.json({statue:false,message:"user not found"});
            }
        }
    })
}
module.exports.resetPassword=async(req,res)=>{
    let schema=Joi.object({
        email:Joi.string().required().email(),
        oldPassword:Joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        newPassword:Joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),    
    })
    Errors=[];  
    let {error}=await schema.validate(req.body,{abortEarly:false});
    if(error){
        error.details.map((msg)=>{
            Errors.push(msg.message);
        })
    }
    if(Errors.length>0){
        console.log(Errors);  
        res.json(Errors);
    } else { 
        const {oldPassword,newPassword,email}=req.body;
        let user=await userModel.findOne({email});
        if(user){
            let match=await bcrypt.compare(oldPassword,user.password);
            if(match){
                if(user.emailConfirm){
                    bcrypt.hash(newPassword,4,async function(err,hash){
                        await userModel.updateOne({email},{password:hash});
                        console.log(hash);
                        console.log(newPassword);
                        res.json({statue:true,message:"password updated succesfully"})
                    })
                }else{
                    res.json({statue:false,message:"please verify you account first"});
                }
            }else{
                res.json({statue:false,message:"incorrect oldPassword"})
            }
        }else{
            res.json({statue:false,message:"user dosn't exist"})
        }
    }
}
