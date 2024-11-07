const models = require('../models');

const findAll = async()=>{
    return await models.User.findAll();
}

const createUser = async(userData)=>{
    return await models.User.create(userData);
}

const findUserByEmail = async(email)=>{
    return await models.User.findOne({
        where : {email:email}
    });
}

module.exports = {
    findAll, createUser, findUserByEmail,
}