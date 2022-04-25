const User = require('../models/user');

const userDao = {
    getAllUsers,
    getUserById,
    getUserByMail,
    deleteById,
    createUser,
    updateUser,
    updateUserOneField
}

const getAllUsers = ()=>{
    return User.findAll({raw: true, returning: true});
}

const getUserById = (id)=>{
    return User.findByPk(id);
}

const getUserByMail = (email)=>{
    console.log("email", email)
    return User.findOne({where: {emailAddress: email}, raw: true, returning: true});
}

const deleteById = (id)=>{
    return User.destroy({where: {id: id}});
}

const createUser = (user)=>{
    let newUser = new User(user);
    return newUser.save();
}

const updateUser = (user, id)=>{
    let updatedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified
    };
    return User.update(updatedUser, {where: {id: id}});   
}
const updateUserOneField = (changeObj, id)=>{
    return User.update(changeObj, {where: {id: id}})
}

module.exports = userDao;