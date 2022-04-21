const {Router} = require("express");

const userRoute = Router();
const {registerUser, verifyEmail, getUsers,deleteUser, loginUser, updateProfile, changePassword, forgetPassword, verifyUser, resetPassword} = require('../controllers/userController');
const logger = require("../utils/logger");
const auth = require('../middlewares/authentication');

userRoute.route('/register').post(async (req, res)=>{
    try {
        const result =await registerUser(req.body);
        console.log("result" + result)
        if(result.statusCode === 200) return res.status(result.statusCode).send(result.res)
        else return res.status(result.statusCode).json({message: result.message});
       
    } catch (error) {
        console.log(error);
        throw error;
    }
})


userRoute.route('/allusers').get(auth, async (req, res)=>{
    try {
        const users =await getUsers();
        return res.json({users: users});
    } catch (error) {
        throw error;
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

userRoute.route('/login').post(async (req, res)=>{
    try {
        console.log("userbody", req.body)
        const result = await loginUser(req.body);
        if(result && result.statusCode === 401) return res.json({message: result.message})
        else if(result && result.statusCode === 200) {

            return res.json({message: result.message, details: result.details})
        }
    } catch (error) {
        throw error
    }
})

userRoute.route('/updateprofile').patch(auth, async (req, res)=>{
    try {
        // console.log("req.user",req.user);
        const result = await updateProfile(req && req.body, req && req.user && req.user.id);
        return res.send(result);
    } catch (error) {
        throw error;
    }
})


userRoute.route('/changepassword').post(auth, async (req, res)=>{
    try {
        let result = await changePassword(req && req.body);
        return res.json({response: result})
    } catch (error) {
        throw error;
    }
})

userRoute.route('/forgetpassword').post(async (req, res)=>{
    try {
        let result = await forgetPassword(req && req.body && req.body.emailAddress);
        return res.json({result});
    } catch (error) {
        throw error;
    }
})

userRoute.route('/resetpassword').patch(auth, async (req, res)=>{
    try {
        // let result =await verifyUser(req.user.id); 
        let userId = req.user.id;
        console.log(req.user);
        let result = await resetPassword( req && req.body, userId);
        return res.json(result);       
    } catch (error) {
        throw error;
    }
})
userRoute.route('/deleteuser').delete(auth, async (req, res)=>{
    try {
        console.log(req.user);
        let user = deleteUser(req.user.id);
        
        return res.status(200).json({message: "user deleted", details: user});
    } catch (error) {
        throw error;
    }
})
module.exports = userRoute;

// SequelizeDatabaseError: relation "users" does not exist