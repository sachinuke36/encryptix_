const jwt = require('jsonwebtoken');



//---------------- creating Tokens ---------------------------------------------------//

const createToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_KEY);
};






//------------------------- authenticating use -----------------------------------------------//

const authenticate = (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log("user authenticated")
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = { createToken, authenticate };
