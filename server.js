
import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes.js'
import addData from './routes/addDataRoutes.js'
import getData from './routes/getDataRoutes.js'
import bookTickets from './routes/bookTicketsRoutes.js'



const app=express();

dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/addData',addData);
app.use('/api/v1/getData',getData);
app.use('/api/v1/book',bookTickets);


app.get('/api/v1/hello',(req,res)=>{
  res.send("hello");
})





const port=process.env.PORT || 4000;




app.listen(port,()=>{
  console.log(`The server was started on the port ${port}`);
})