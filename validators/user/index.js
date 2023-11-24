const joi = require("joi")
const loginSchema = joi.object({
    username:joi.string().min(5).max(20).required(),
    password:joi.string().min(6).required()
})

const signUpSchema =  joi.object({
    username:joi.string().min(5).max(20).required(),
    password:joi.string().min(6).required(),
    confirmed_password:joi.any().valid(joi.ref("password")).required(),
    email:joi.string().email().required(),
    phone:joi.number()
})
module.exports = {loginSchema,signUpSchema}
