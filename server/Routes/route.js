const express = require("express");
const userdb = require("../Model/userSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authentication = require("../Middleware/Authentication");



router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              res.status(400).json({
                                        status: 400,
                                        message: "Plz Fill All fileds"
                              })
                    } else {
                              const checkUser = await userdb.findOne({
                                        email: email
                              });
                              if (checkUser) {
                                        // return res.status(201).send('Email already exist');
                                        res.status(201).json({
                                                  status: 201,
                                                  message: "Email Already Exist"
                                        })
                              } else {
                                        // console.log("done");
                                        const data = new userdb({
                                                  name,
                                                  email,
                                                  password,
                                                  cpassword
                                        });

                                        const storeData = await data.save();
                                        // console.log(storeData);

                                        res.status(201).json({
                                                  status: 202,
                                                  message: "Registration Successfully done...",
                                                  storeData
                                        })
                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Not Register"
                    })
          }
});



//login User
router.post("/login", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              res.status(403).json({
                                        error: "Plz Fill all fields..."
                              })
                    } else {
                              const preUser = await userdb.findOne({
                                        email: email
                              });

                              if (!preUser) {
                                        res.status(201).json({
                                                  status: 202,
                                                  message: "Have not Account?"
                                        })
                              } else {
                                        // console.log("done");
                                        const isMatchPassword = await bcrypt.compare(password, preUser.password);

                                        if (!isMatchPassword) {
                                                  res.status(201).json({
                                                            status: 203,
                                                            message: "Have not Account?"
                                                  });
                                        } else {
                                                  // console.log("done");

                                                  //token generate
                                                  const token = await preUser.generateAuthToken();
                                                  // console.log(token);



                                                  //generate cookie and store data in cookie with time set of one day
                                                  res.cookie("auth_token", token, {
                                                            httpOnly: true,
                                                            maxAge: 24 * 60 * 60 * 1000
                                                  });

                                                  const result = {
                                                            preUser,
                                                            token
                                                  };



                                                  res.status(201).json({
                                                            status: 204,
                                                            message: "User Login Successfully done",
                                                            result
                                                  })
                                        }
                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Not Logins"
                    })
          }
});



router.get("/validUser", authentication, async (req, res) => {
          // console.log("done");
          // console.log(req.getData);

          if (req.getData) {
                    // console.log("user Authorised");
                    res.status(201).json({
                              status: 200,
                              message: "User Authorised",
                              userData: req.getData
                    })
          } else {
                    console.log("user not authorised");
          }
});





//add skill here...
router.post("/skillAdd", authentication, async (req, res) => {
          try {
                    const {
                              skills
                    } = req.body;
                    const userId = req.getData._id;

                    if (!skills || !Array.isArray(skills)) {
                              return res.status(400).json({
                                        error: "Invalid skills data",
                              });
                    }

                    const user = await userdb.findById(userId);

                    if (!user) {
                              return res.status(404).json({
                                        error: "User not found",
                              });
                    }

                    // Assuming you have a field in your User model to store skills, you can update it like this
                    user.skills = skills;

                    const savedUser = await user.save();

                    // Respond with a success message and the updated user data
                    res.status(200).json({
                              status: 200,
                              message: "Skills added successfully",
                              user: savedUser,
                    });
          } catch (error) {
                    res.status(500).json({
                              error: "Failed to add skills",
                    });
          }
});





module.exports = router;