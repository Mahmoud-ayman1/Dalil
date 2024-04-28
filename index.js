const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
app.use(express.json())
const cors=require('cors');
app.use(cors());
app.use('/users',require('./APIs/user.api'))
app.use('/medicine',require('./APIs/medicine.api'))
app.listen(port, () => console.log(`connected , Example app listening on port ${port}!`))
mongoose.connect('mongodb+srv://dalil:dalil@cluster0.q42qdrh.mongodb.net/')
.then(()=>{
    console.log('db connected');
})
.catch((err)=>{
    console.log(err);
})
app.use('*',(req,res)=>{
    res.json({message:"lef we 2rg3 tany"});
})
