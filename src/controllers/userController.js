const { loggers } = require('winston');

const User = require('../models/user');
const {
    getAllUsers,
    getUserById,
    getUserByMail,
    deleteById,
    createUser,
    updateUser,} = require('../dao/user.dao') 
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

            let token = newToken(user);
            let to = data.emailAddress;
            let subject = "Hello, regarding verification of your account";
            let text = "Verify your account by clicking on below link";
            let link =  `http://localhost:${process.env.PORT}/app/user/verify/${token}`;
            console.log("before sendmail")
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
        let users = getAllUsers();
        return users;        
    } catch (error) {
        return error;
    }
}

const verifyEmail = async (token)=>{
    let user = await verifyToken(token);
    user = user.user;
    if(!user){
        return(false)
    }else {
        user.isVerified = true;
        console.log(user.emailAddress);
        console.log("userafterjwt", user);
        let result = User.update(user, {where: {emailAddress: user.emailAddress}});
        return true;
    }
}

const deleteUser = async (id)=>{
    try {
        let user = await deleteById(id);
        return user;
        
    } catch (error) {
        logger.error(error)
        throw error;
    }
}
const loginUser =async (data) =>{

    try {

        console.log("userName",  data.user);
        let email = data.user;
        let user =  await getUserByMail(email);

        if(!user.isVerified) return {message: "Verify your account on the link send to your registered email address", statusCode:401}
        else if(!decryptPassword(data.pass, user.password)) return {message: "Incorrect password", statusCode:401}
        let token = newToken(user);
        // localStorage.setItem("token", JSON.stringify(token));
        return {message: "Login succesful", detials: user, statusCode: 200};

    } catch (error) {
        throw error;
    }
}

module.exports = {registerUser, verifyEmail, getUsers, deleteUser, loginUser};