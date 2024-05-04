const Joi=require('joi');
let schema=Joi.object({
    name:Joi.string().required().min(3).max(15),
    email:Joi.string().required().email(),
    password:Joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
})
module.exports.userValidate=(req,res,next)=>{
    let Errors=[];
    let {error}=schema.validate(req.body,{abortEarly:false});
    if(error){
        error.details.map((msg)=>{
            Errors.push(msg.message);
        })
    }
    if(Errors.length>0){
        console.log(Errors);  
        res.json(Errors);
    }else{
        next();
    }
}
