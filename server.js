require('dotenv/config');
const mongoose=require('mongoose');
const app=require('./app');
mongoose.connect(process.env.MONNGODB_URL,{
    useUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
   .then(()=>console.log("connected to mongodb"))
   .catch((err)=>console.log("NOt connected to database"))



const port=process.env.PORT||3000
 
app.listen(port,()=>{
    console.log("server is running ",port);
});
   