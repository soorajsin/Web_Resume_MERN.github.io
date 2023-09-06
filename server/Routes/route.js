const express = require("express");
const userdb = require("../Model/userSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");



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
                                                  console.log(token);
                                        }
                              }
                    }
          } catch (error) {
                    res.status(422).json({
                              error: "Not Logins"
                    })
          }
})


module.exports = router;