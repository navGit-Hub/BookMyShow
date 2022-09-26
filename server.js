
import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';

import authRouter from './routes/authRoutes.js'



const app=express();

dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/auth',authRouter);




app.get('/api/v1/hello',(req,res)=>{
  res.send("hello");
})





const port=process.env.PORT || 4000;






app.listen(port,()=>{
  console.log(`The server was started at the port ${port}`);
})