const User = require('../models/user');

const userDao = {
    getAllUsers,
    getUserById,
    getUserByMail,
    deleteById,
    createUser,
    updateUser,

}

function getAllUsers (){
    return User.findAll();
}

function getUserById(id){
    return User.findByPk(id);
}

function getUserByMail(email){
    return User.findOne({where: {emailAddress: email}});
}

function deleteById(id){
    return User.destroy({where: {id: id}});
}

function createUser(user){
    let newUser = new User(user);
    return newUser.save();
}

function updateUser(user, id){
    let updatedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified
    };
    return User.update(updatedUser, {where: {id: id}});   
}

module.exports = userDao;