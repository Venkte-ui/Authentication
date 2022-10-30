const bcrrypt=require('bcrypt');
const axios=require('axios');
const _=require('lodash');
const otpgenerator=require('otp-generator');
const User=require('../models/usermodels');
const Otp=require('../models/otpmodel');
const { runInContext } = require('lodash');

module.exports.signUp=async(req,res)=>{
const user=await User.findOne({
   email=req.body.email body
});
if(user) return res.status(400).send("User already registered");
const OTP=otpGenerator.generate(4,{
    digits:true,alphabets:false, uppercase:false,spcialChars:false
});
const email=req.body.email;
console.log(OTP);
const otp=new Otp({
    email:email,otp:OTP
});
const salt=await bcrypt.genSalt(13)
otp.otp =await bcrypt.hash(otp.otp,salt);
const result=await otp.save();
return res.status(200).send("Otp send sucessfully");
}
module.exports.veryfyOtp=async(req,res)=>
{
const otpHolder=await Otp.find({
    email:req.body.email
});
if(otpHolder.length==0) return res.status(400).send("You used expire otp");
const rightOtpFind=otpHolder[otpHolder.length-1];
const validuser=await bcrypt.compare(req.body.otp,rightOtpFind.otp);
if(rightOtpFind.number===req.body.number && validuser)
{
    const user=new User(_.pick(req.body,["email"]));
    const token=user.generateJWT();
    const result=await user.save();
    const OTPDelete=await Otp.deleteMany({
        number:rightOtpFind.number
    });
    return res.status(200).send({
        message:"User Registartion Successfull",
        token:token,
        data:result
    });
}  else{
return res.status(400).send("Your otp is worng");
}
}
