const Joi = require('@hapi/joi');

//register validation

const registerValidation = (data) =>{
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema)
};


//login validation

const loginValidation = (data) =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema)
}

//blog validation

const blogValidation = (data) =>{
    const schema = {
        tittle: Joi.string().min(3).required(),
        description: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema)
};

//message validation

const messageValidation = (data) =>{
    const Schema = {
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        message: Joi.string().min(6).required(),
    };
    return Joi.validate(data, Schema)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.blogValidation = blogValidation;
module.exports.messageValidation = messageValidation;