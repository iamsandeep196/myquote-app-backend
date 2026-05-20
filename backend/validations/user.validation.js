const joi = require("joi");


// validations
const registerValidation = joi.object({
    
    name : joi.string().min(2).max(20).required().messages({
        "string.empty":"Name is required",
        "string.min":"Name must be at leat 2 character"
    }),
    email:joi.string().email().required().messages({
        "string.email":"Invalid email",
        
    }),
    password:joi.string().min(3).required().messages({
        "string.min":"Password must be at least 3 characters"
    })
});

const loginValidation = joi.object({
    email:joi.string().email().required().messages({
        "string.email":"Invalid email",
        "string.empty":"Email is required"
    }),
    password:joi.string().required().messages({
        "string.empty":"Password is required",
        "any.required":"Password is required"
    })
});

module.exports = { registerValidation , loginValidation };