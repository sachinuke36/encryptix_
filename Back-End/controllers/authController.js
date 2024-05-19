const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { getDB } = require('../config/database');
const { createToken } = require('../middlewares/authMiddleware');
const { ObjectId } = require('mongodb');

const userCollection = getDB().collection("user");





//------------- login ----------------------------//

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error' });
  }
};









//------------------------ Register -------------------------//

const register = async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    const user = await userCollection.findOne({ email: email });
    if (user) {
      return res.json({ success: false, message: 'Already have an account, please log in !' });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a valid Email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await userCollection.insertOne({ name: fname, email: email, password: hashedPass });
    const token = createToken(newUser.insertedId);
    res.json({ success: true, token: token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error occurred' });
  }
};









//------------------------------ validate user ------------------------//
const validate = async (req, res) => {
  const { localtoken } = req.headers;
  try {
    const isTokenValid = jwt.verify(localtoken, process.env.JWT_KEY);
    if (isTokenValid) {
      res.json({ success: true, message: 'Valid user' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'User unauthorized' });
  }
};

module.exports = { login, register, validate };
