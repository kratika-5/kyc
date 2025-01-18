const express = require('express')
const mongoose = require('mongoose')
const path =require('path')
const port = 3018

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/student');
const db = mongoose.connection
db.once('open', ()=> {
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    account_number:String
})
const Users = mongoose.model("data", userSchema)

 app.get('/', (req ,res) => { 
    res.sendFile(path.join(__dirname,'kyc.html'))
 });
 app.get('/submission', (req ,res) => { 
    res.sendFile(path.join(__dirname,'submission.html'));
 });

 app.post('/post',async (req , res)=> {
      const { username , password,account_number} = req.body    
      const user = new Users({
        username,
        password,
        account_number
      });
    try {
        await user.save();
        console.log(user);
        res.redirect('/submission');
    } catch (error) {
        console.errror('error saving user:' , error);
        res.status(500).send('error saving user data');
    }  
       
 });

app.listen(port , ()=>{
    console.log("server started");

});