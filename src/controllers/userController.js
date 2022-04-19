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
const { loggers } = require('winston');
const logger = require('../utils/logger');

const registerUser =async (data)=>{
    try {
        let user =  await getUserByMail(data.emailAddress);
        if (user) {
            logger.info("user exists" + user);  
            return ("user already exists");                     
        }else{
            console.log("before create user")
            user = await createUser(data);   
            logger.info(user);       
            let token = newToken(user);
            let to = data.emailAddress;
            let subject = "Hello, regarding verification of your account";
            let text = "Verify your account by clicking on below link";
            let link =  `http://localhost:${process.env.PORT}/verification/${token}`;
            console.log("before sendmail")
            await sendMail(to, subject, text, link);
            return user;
        }
    } catch (error) {
        logger.error(error);
        return error;
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
    if(!user){
        return(false)
    }else {
        loggers.info("userafterjwt", user);
        user = User.update({isVerified: true}, {where: {email: user.email}});
        return true;
    }
}

// const login = (data) =>{
//     try {
        
//     } catch (error) {
//         res.send("could not login")
//     }
// }

module.exports = {registerUser, verifyEmail, getUsers};