const dotenv = require('dotenv');
dotenv.config();
const express=require('express')
const cors=require('cors');
const app=express();
const userRoutes = require('./routes/user.routes.js');

const connectToDatabase=require('./db/db')

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.use('/users', userRoutes);

module.exports=app;