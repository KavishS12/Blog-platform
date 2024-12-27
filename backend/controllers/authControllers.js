const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if (!user) {
            //if no user exists with the given email
            return res.status(401).json({ error: "Invalid email or password" });
        }
      
        bcrypt.compare(password, user.password, (err, response) => {
            if (err) {
              return res.status(500).json({
                error: "Error during password comparison. Please try again",
              });
            }
            if (response) {
              jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                  if (err) throw err;
                  res.cookie("token", token, { httpOnly: true });
                  res.json(user);
                }
              );
            } else {
              return res.status(401).json({ error: "Invalid email or password" });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error. Please try again later", error: err});
    }
};

const registerUser = async function (req, res) {
    try {
      const { name, email, phone, password } = req.body;
      console.log(name, email, phone, password);
  
      //check if existing user
      const existingUser = await User.findOne({
        $or: [{ email: email }, { phone: phone }],
      });
  
      if (existingUser) {
        //if user already exists
        return res.status(409).json({ error: "User already exists with the entered details" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
  
      if (!user) {
        // If anything fails during user creation
        return res.status(500).json({error: "Failed to create the user.Please try again later.",});
      }
  
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error.', error: err });
    }
  };
  
module.exports = {loginUser,registerUser};
