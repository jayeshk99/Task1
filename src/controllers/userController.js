const { loggers } = require('winston');

const User = require('../models/user');
const {
    getAllUsers,
    getUserById,
    getUserByMail,
    deleteById,
    createUser,
    updateUser,
    updateUserOneField,
    } = require('../dao/user.dao') 
const sendMail = require('../utils/nodemailer')
const {newToken, verifyToken} = require('../utils/jwt');
const logger = require('../utils/logger');
const {encryptPassword, decryptPassword} = require('../utils/encrypt');
const res = require('express/lib/response');



const registerUser =async (data)=>{
    try {
        let user =  await getUserByMail(data.emailAddress);
        if (user) {
            logger.info("user exists" + user);  
            return {statusCode: 400,
                message: "User already exists"}                   
        }else{

            let hashedPass = encryptPassword(data.password);
            data.password = hashedPass;
            user = await createUser(data);   
            logger.info(user);       
            if(!user) return {statusCode: 400, res: "", message: "User not created"}
            let token = newToken(user);
            let to = data.emailAddress;
            let subject = "Hello, regarding verification of your account";
            let text = "Verify your account by clicking on below link";
            let link =  `http://localhost:${process.env.PORT}/app/user/verify/${token}`;
            // console.log("before sendmail")
            sendMail(to, subject, text, link);

            return {statusCode: 200, res: user, message: "success"};
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const getUsers = async ()=>{

    try {
        let users =await getAllUsers();
        if(!users) return false;
        return users;        
    } catch (error) {
        throw error
    }
}

const verifyEmail = async (token)=>{
    let user = await verifyToken(token);
    user = user.user;
    if(!user){
        return(false)
    }else {
        user.isVerified = true;
        // console.log(user.emailAddress);
        console.log("userafterjwt", user);
        let result =await User.update(user, {where: {emailAddress: user.emailAddress}});
        return true;
    }
}

const deleteUser = async (id)=>{
    try {
        let user = await deleteById(id);
        if(!user) return false;
        return user;
        
    } catch (error) {
        logger.error(error)
        throw error;
    }
}
const loginUser =async (data) =>{

    try {

        // console.log("userName",  data.user);
        let email = data && data.user;
        let user =  await getUserByMail(email);

        if(!user.isVerified) return {message: "Verify your account on the link send to your registered email address", statusCode:401}
        else if(!decryptPassword(data.pass, user.password)) return {message: "Incorrect password", statusCode:401}
        let token = newToken(user);
        user.token = token;
        return {message: "Login succesful", details: user, statusCode: 200};

    } catch (error) {
        throw error;
    }
}

const updateProfile = async (data, id) =>{
    try {
        let user = await getUserById(id);
        console.log("user", user);
        // user.firstName = changeObj.firstName;
        let result = await updateUserOneField(data, id);
        if(!result) return {message: "Updation failed ", details: ""}
        return {message: `Updated Succesfully`, details: result}   
    } catch (error) {
        throw error;
    }
    
}

const changePassword = async (data)=>{
    try {
        let user = await getUserByMail(data && data.emailAddress);
        

        if(!decryptPassword(data && data.currentPassword, user && user.password)) return {message: "Incorrect current password"}
        else if(decryptPassword(data && data.currentPassword, user && user.password)) {
            user.password = encryptPassword(data.newPassword);
            return {message: "Password changed succesfully", detials: user};
        }
    } catch (error) {
        throw error;
    }
}

const forgetPassword = async (email)=>{
    try {
        let user =  await getUserByMail(email);

        let token = newToken(user);
        let to = email;
        let subject = "Forget password";
        let text = "Reset your password by clicking on below link";
        let link =  `http://localhost:${process.env.PORT}/app/user/resetpassword/${token}`;
        sendMail(to, subject, text, link);
        return {message: "Link send to your registered mail for reset password"}
    } catch (error) {
        throw error;
    }
}

const resetPassword = async (data, id)=>{
    try {
        data.password = encryptPassword(data && data.password);

        let result =await updateUserOneField(data, id);
        if(result) return {message: "Password changed succesfully"}
        else return {message: "Could not change password"}
        
    } catch (error) {
        throw error;
    }
}
// const verifyUser = async (token)=>{
//     try {
//         let result = await verifyToken(token);
//         let user = result.user;
//         let newPassword = `${user.firstName}@123`;
//         user.password = encryptPassword(newPassword);
//         return {message: `Your new password is < ${newPassword} >. Change your password after you login with this one`}
//     } catch (error) {
//         throw error;
//     }
// }
module.exports = {
      registerUser,
      verifyEmail,
      getUsers, 
      deleteUser, 
      loginUser, 
      updateProfile, 
      changePassword, 
      forgetPassword, 
      resetPassword
    };