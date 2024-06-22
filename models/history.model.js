const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    email:String,
    medicine:String
})
module.exports=mongoose.model('history',schema)
