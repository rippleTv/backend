const {registerUser} =  require("../services/user");
// const auth = require('../middleware/auth')



  
     function AuthController() {
        console.log("yes....")
        // let body = req.body;
        this.registerUser = ((req, res, next) => {
            console.log(req.body)
            registerUser(req.body).then(result => {
                console.log("here")
           if(result.exist === true){
            res.send(result.message)
           }
           else{
               res.send(result.message)
           }


        }).catch(error => {
            console.log(error)
            res.send({
                success:false,
                message: "could not add user",
                data: error
            })
        })
        })
       
    }


    module.exports = AuthController
    