const User = require('../model/user');
const bcrypt = require("bcryptjs");




const registerUser = function (Body) {
    console.log(Body.email)
   return User.findOne({ email: Body.email})
   .then(user => {
        if(user){
          return ({exist: true, message: "Email already exist"});
        }
        
          const newUser  = new User(
                      {
                          name: Body.name,
                          email: Body.email,
                          password: Body.password,
                          role: Body. role
                          
              
                  })
                      return newUser.password =  bcrypt.hash(newUser.password, 10).then((hashedPassword) => {
                          newUser.password = hashedPassword;
                          let result = newUser.joiValidate({
                          name: Body.name,
                          email: Body.email,
                          password: Body.password,
                          role: Body. role
                          })
                          if(result.error !== null) {
                            return({user: null, message: result.error.details[0].message})
                          }
                          if(Body.password === Body.password2){
                            newUser.save();
                          return ({user, message: "User successfully added"})
                          }
                          else{
                            return ({user, message: "Password doesn't match"})
                          }
                        
  
                      }).catch(error => {
                          return error
                      })
                   
                  
              })
              .catch(error => {
                   return error;
              })
}



module.exports = {registerUser }