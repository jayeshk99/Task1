const {Router} = require("express");

const userRoute = Router();
const {registerUser, verifyEmail, getUsers} = require('../controllers/userController');
const logger = require("../utils/logger");


userRoute.route('/register').post( (req, res)=>{
    try {
        const result = registerUser(req.body);
        console.log("result" + result)
        return res.send(result);
    } catch (error) {
        res.send(error);
    }
})


userRoute.route('/allusers').get( (req, res)=>{
    try {
        const users = getUsers();
        return res.send(users);
    } catch (error) {
        res.send(error);
    }
})

userRoute.route('/verify/:token').get(async (req, res)=>{
    try {
        const user = verifyEmail(req.params.token); 
        if(user) return res.send("Succesfully Verified")
        else return res.send("Invalid token")      
    } catch (error) {
        res.send("error:" + error)
    }
})

module.exports = userRoute;

// SequelizeDatabaseError: relation "users" does not exist