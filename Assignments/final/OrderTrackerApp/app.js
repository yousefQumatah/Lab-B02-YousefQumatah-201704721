//Todo 1.5 check the exam PDF for the requirement of this part
import express from 'express'
import router from './router.js'
import mongoose from "mongoose";
import morgan from 'morgan'

const port = 8080
const app = express()

const uri = 'mongodb://127.0.0.1:27017/item-tracker-yousefqumatah'
const option = {useNewUrlParser : true , useUnifiedTopology : true}

mongoose.connect(uri , option , ()=>{
    console.log('Connected to database successfully')
})

//two types [dynamic , static]
app.use(express.static('public'))
//a middleware

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', router)

//CRUD operations on
app.listen(port, () => {
    console.log(`Server started @http://localhost:${port}`)
})