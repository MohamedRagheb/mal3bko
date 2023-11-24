const joi = require("joi")
const loginSchema = joi.object({
    username:joi.string().min(5).max(20).required(),
    password:joi.string().min(6).required()
})
const userSchema = {loginSchema}
module.exports = userSchema
