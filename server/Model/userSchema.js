const {
          default: mongoose
} = require("mongoose");
const validator = require("validatorjs");




const userSchema = mongoose.Schema({
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
          tokens:[
                    {
                              token:{
                                        type :String,
                                        required:true
                              }
                    }
          ]
});



const userdb=mongoose.model(userSchema);

module.exports=userdb;