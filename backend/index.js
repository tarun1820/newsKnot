const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const coros = require("cors");
const bcrypt=require("bcryptjs");

const app = express();
app.use(express.json());
app.use(coros());




//mogodb connection,schema and model


//for local mongobb comment it to use cloud mongodb
const mongoDbUrl="mongodb://127.0.0.1:27017/testdb";
// const mongoDbUrl="mongodb+srv://tarun1820:$Tarun%401820@cluster0.aksnxov.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(mongoDbUrl,{
    useNewUrlParser:true
}).then(()=>{
    console.log("connection succesfull")
}).catch((err)=>{
    console.log(err);
});

const userschema = new mongoose.Schema(
    {
        username:String,
        email:{type:String,unique:true},
        password:String
    },
    {
        collection:"userinfo"
    }
)

const userinfo=mongoose.model("userinfo",userschema);






//listining to signup form 
app.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body;
    const encriptedpassword = await bcrypt.hash(password,10);
    try{
      const olduser=await userinfo.findOne({email});
      //checking for email if alredy registered or not
      if(olduser){
        return res.json({error:"email alredy regitered"});
      }
      //creating user with unique email
      await userinfo.create({
         username,
         email,
         password:encriptedpassword
      })
      res.send({status:"ok"})
    }
    catch(err){
        console.log(err);
        res.send({status:"not ok"})
    }
    
})



//listining to login form 
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
     
    try{
      const olduser=await userinfo.findOne({username});
      //checking for email if alredy registered or not
      if(olduser){
        const validuser = await bcrypt.compare(password,olduser.password);
        if(validuser){
            return res.json({error:"succesfully logged in"});
        }
        else{
            return res.json({error:"incorrect password"});
        }
        // return res.json({error:"email alredy regitered"});
      }
      res.send({status:"user not registered"});
    }
    catch(err){
        console.log(err);
        res.send({status:"not ok"})
    }
    
})

app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
     
    try{
      const olduser=await userinfo.findOne({username});
      //checking for email if alredy registered or not
      if(olduser){
        const validuser = await bcrypt.compare(password,olduser.password);
        if(validuser){
            return res.json({error:"succesfully logged in"});
        }
        else{
            return res.json({error:"incorrect password"});
        }
        // return res.json({error:"email alredy regitered"});
      }
      res.send({status:"user not registered"});
    }
    catch(err){
        console.log(err);
        res.send({status:"not ok"})
    }
    
})

//backend is listing to port 5000
app.listen(5000,()=>{console.log("sever started")});
