const express=require('express');
const app=express();
app.use(express.json());
const userRouter=require('./routes/userRouter');
app.use('/api/user',userRouter);
module.exports=app;