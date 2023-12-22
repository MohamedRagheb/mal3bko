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
const editSchema = joi.object({
    username:joi.string().min(5).max(20),
    password:joi.string().min(6),
    confirmed_password: joi.string().when('password', {
    is: joi.exist(),
    then: joi.valid(joi.ref('password')).required(),
}),
    email:joi.string().email(),
    phone:joi.number(),
})
const verifyEmailSchema = joi.object({
    code:joi.number().integer().min(100000).max(999999),
    email:joi.string().email()

})
module.exports = {loginSchema,signUpSchema,editSchema,verifyEmailSchema}
