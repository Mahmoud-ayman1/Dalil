const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
app.use(require('cors'));
app.use(express.json())
app.use('/users',require('./APIs/user.api'))
app.use('/medicine',require('./APIs/medicine.api'))
app.listen(port, () => console.log(`connected , Example app listening on port ${port}!`))
mongoose.connect('mongodb+srv://dalil:dalil@cluster0.q42qdrh.mongodb.net/')
