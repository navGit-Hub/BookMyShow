import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';

const app=express();

dotenv.config();

//middleware
app.use(express.json);
app.use(express.urlencoded({extended:true}))



const port=process.env.PORT || 4000;






app.listen(port,()=>{
  console.log(`The server was started at the port ${port}`);
})