const {Router} = require("express");

const userRoute = Router();
const {registerUser, verifyEmail, getUsers,deleteUser, loginUser, updateProfile, changePassword, forgetPassword, verifyUser} = require('../controllers/userController');
const logger = require("../utils/logger");


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


userRoute.route('/allusers').get( (req, res)=>{
    try {
        const users = getUsers();
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
        if(result && result?.statusCode === 401) return res.json({message: result.message})
        else if(result && result?.statusCode === 200) {

            return res.json({message: result.message, details: result.details})
        }
    } catch (error) {
        throw error
    }
})

userRoute.route('/updateprofile/firstname/:id').post(async (req, res)=>{
    try {
        let changeObj = {firstName: req.body.newFirstName}
        const result = await updateProfile(changeObj, req.params.id);
        return res.send(result);
    } catch (error) {
        throw error;
    }
})

userRoute.route('/updateprofile/lastname/:id').post(async (req, res)=>{
    try {
        let changeObj = {lastName: req.body.newLastName}
        const result = await updateProfile(changeObj, req.params.id );
        return res.json({user: result});
    } catch (error) {
        throw error;
    }
})

userRoute.route('/updateprofile/phonenumber/:id').post(async (req, res)=>{
    try {
        let changeObj = {phoneNumber: req.body.newPhoneNumber}

        const result = await updateProfile(changeObj, req.params.id);
        return res.json({user: result})
    } catch (error) {
        throw error;
    }
})

userRoute.route('/updateprofile/changepassword').post(async (req, res)=>{
    try {
        let result = await changePassword(req.body);
        return res.json({response: result})
    } catch (error) {
        throw error;
    }
})

userRoute.route('/forgetpassword').post(async (req, res)=>{
    try {
        let result = await forgetPassword(req.body.emailAddress);
        return res.json({result});
    } catch (error) {
        throw error;
    }
})

userRoute.route('/resetpassword/:token').get(async (req, res)=>{
    try {
        let result =await verifyUser(req.params.token); 
        
        return res.send(result);       
    } catch (error) {
        throw error;
    }
})
userRoute.route('/deleteuser/:id').delete(async (req, res)=>{
    try {
        let user = deleteUser(req.params.id);
        return res.status(200).json("user deleted");
    } catch (error) {
        throw error;
    }
})
module.exports = userRoute;

// SequelizeDatabaseError: relation "users" does not exist