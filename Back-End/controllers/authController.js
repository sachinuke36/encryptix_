const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { getDB } = require('../config/database');
const { createToken } = require('../middlewares/authMiddleware');
const { ObjectId } = require('mongodb');

const userCollection = getDB().collection("user");
const jobSeekersCollection = getDB().collection('jobSeekers')


//----------------- for employer ------------------------------//


//------------- login ----------------------------//

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = createToken(user._id);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
     return res.json({ success: false, message: 'Error' });
  }
};





//------------------------ Register -------------------------//

const register = async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    const user = await userCollection.findOne({ email: email });
    if (user) {
      return res.status(409).json({ success: false, message: 'Already have an account, please log in !' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Enter a valid Email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await userCollection.insertOne({ name: fname, email: email, password: hashedPass });
    const token = createToken(newUser.insertedId);
    return res.json({ success: true, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error occurred' });
  }
};



//---------------------------- for Employee --------------------------------//

   //---------------------- login ----------------------//
const loginJobSeekers = async (req, res)=>{
    const {email, password} = req.body; 
    try {
      const user = await jobSeekersCollection.findOne({email:email});
    if(!user){
     return res.status(404).send({success:false, message:"user doesn't exist"})
    }
    const isUser = await bcrypt.compare(password,user.password);
    if(!isUser){
      return res.status(401).send({success:false, message:'Invalid credentials'});
    }
    const token = createToken(user._id);
    return res.send({success:true, token});
    } catch (error) {
      console.log(error)
      return res.status(500).send({success:false, message:'Error occured'})
    }   
}




   //-------------------- Register --------------------------//

   const registerJobSeeker = async (req,res)=>{
    const {email, fname, password} = req.body;
    try {
      const user = await jobSeekersCollection.findOne({email:email});
      if(user){
        return res.status(409).json({success:false, message:'Already have an account, please log in'});
      }
      if(!validator.isEmail(email)){
        return res.status(400).json({success:false, message:'Please enter a valid email'});
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,salt);
      const newUser = await jobSeekersCollection.insertOne({name:fname, email:email, password:hashedPass});
      const token = createToken(newUser.insertedId);
     return res.json({success:true, token:token});
    } catch (error) {
      console.log(error)
     return res.status(500).json({success:false, message:'Error occured'});
    }
   }





//------------------------------ validate user ------------------------//
const validate = async (req, res) => {
  const { token } = req.headers;
  try {
    const isTokenValid = await jwt.verify(token, process.env.JWT_KEY);
    if (isTokenValid.id) {
     return res.json({ success: true, message: 'Valid user' });
    }
  } catch (error) {
    console.error(error);
   return res.status(401).json({ success: false, message: 'Error' });
  }
};



const updateResume = async(req,res)=>{
  const {resume} = req.body;
  const {token} = req.headers;
  if(!resume){
   return res.json({success:false, message:'Please provide the resume'})
  }
  const userId = await jwt.verify(token, process.env.JWT_KEY).id;
  if(!userId){
    return res.json({success:false, message:'Invalid credentials'})
  }
  const user = await jobSeekersCollection.find({_id: new ObjectId(userId)});
  if(!user){
   return res.json({success:false, message:'No user found'});
  }
  const response = await jobSeekersCollection.updateOne({_id: new ObjectId(userId)},{$set:{resume:resume}});
  if(response.modifiedCount){
    console.log(response)
   return res.json({success:true, message:'Information updated'})
  }
}

const getResume = async (req,res)=>{
  const {token} = req.headers;
  const userId = await jwt.verify(token, process.env.JWT_KEY).id;
  const user = await jobSeekersCollection.findOne({_id: new ObjectId(userId)});
  if(!user){
   return res.json({success:false, message:'user not found'});
  }
  return res.json({success:true, data:user.resume}) 
  
}

module.exports = { login,getResume, register, validate, loginJobSeekers, registerJobSeeker, updateResume};
