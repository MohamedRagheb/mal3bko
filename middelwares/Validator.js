// const Joi = require('joi')
const createHttpError = require('http-errors')
const Validators = require('../validators')

const  validator = (validator,sub)=> {

    if(!Validators.hasOwnProperty(validator)){

        console.log(`'${validator}' validator is not exist`)}

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator][sub].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if (err.isJoi)
                return next(createHttpError(400, {message: err.message}))
            next(createHttpError(400))
        }   }
    }
module.exports = validator
