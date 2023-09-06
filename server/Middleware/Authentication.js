const jwt = require("jsonwebtoken");
const userdb = require("../Model/userSchema");
const keysecret = "jkuhgfdsaewdxcfvghmnjkiuytmnbvgh";

const authentication = async(req, res, next) => {
          try {
                    const token = req.headers.authorization;
                    // console.log(token);

                    if (!token) {
                              return res.status(401).json({
                                        message: "Authorization token is missing.",
                              });
                    } else {
                              // Verify the token and handle errors
                              const verifyToken = jwt.verify(token, keysecret);

                              const getData=await userdb.findOne({_id:verifyToken._id});

                              if(!getData){
                                        return  res.status(503).send('User not found');
                              }else{
                                        req.getData=getData;
                                        next();
                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Token not found...",
                    });
          }
};

module.exports = authentication;