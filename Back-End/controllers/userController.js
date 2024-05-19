const jwt = require ('jsonwebtoken') // for authentication
const bcrypt = require('bcrypt') 
const  validator = require('validator');
const { genSalt } = require('bcrypt');


 //-------------- creating token ------------------//
 const createToken = (userId)=>{
    const payload = {
     id : userId
    };
     return jwt.sign(payload,process.env.JWT_KEY)
  }






   //------------ Login -----------------//
   const loginUser = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await userCollection.findOne({email:email});
      if(!user){
        return res.json({success:false, message:'user does not exist'})
      }
      const isUser = await bcrypt.compare(password, user.password);
      if(!isUser){
        return res.json({success:false, message:'Invalid credentials'})
      }
      // console.log(user._id)
      const token = createToken(user._id);
      res.json({success:true, token});
    } catch (error) {
      console.log(error);
      res.json({success:false, message:'Error'});
    }
}






//---------------- register user ----------------------//
const registerUser = async(req,res)=>{

    try {
      const {fname, email, password} = req.body;

    //---------- checking if user already has an account--------//
    const user = await userCollection.findOne({email:email});
    if(user){
      return res.json({success:false,message:'Already have an account'})
    }

    if(!validator.isEmail(email)){
      return res.json({success:false, message:'Enter a valid Email'})
    }
    const salt = await genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);
    const newUser = await userCollection.insertOne({name:fname,email:email,password:hashedPass});
    console.log(newUser.insertedId);
    const token = createToken(newUser.insertedId);
    res.json({success:true, data:token})
    // console.log(token)

    } catch (error) {
      console.log(error);
      res.json({success:false, message:'Error occured'})
      
    }
  }

  module.exports = {
    loginUser,
    registerUser
  };


