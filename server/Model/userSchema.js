const mongoose = require("mongoose");
const validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "jkuhgfdsaewdxcfvghmnjkiuytmnbvgh";




const userSchema = new mongoose.Schema({
          name: {
                    type: String,
                    requird: true
          },
          email: {
                    type: String,
                    required: true,
                    unique: true,
                    validator(value) {
                              if (!validator.isEmail(value)) {
                                        throw new Error('Invalid Email');
                              }
                    }

          },
          password: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          cpassword: {
                    type: String,
                    required: true,
                    minlength: 6
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});



//password hashing
userSchema.pre("save", async function (next) {
          if (this.isModified("password")) {
                    try {
                              this.password = await bcrypt.hash(this.password, 12);
                              this.cpassword = await bcrypt.hash(this.cpassword, 12);
                    } catch (error) {
                              return next(error);
                    }
          }
          next();
});



//token generate
userSchema.methods.generateAuthToken = async function () {
          const user = this;
          const token = jwt.sign({
                    _id: user._id.toString()
          }, keysecret);

          user.tokens = user.tokens.concat({
                    token
          });
          await user.save();

          return token;
};




const userdb = mongoose.model("users", userSchema);

module.exports = userdb;