// const Joi = require('joi')
const createHttpError = require('http-errors')
const Validators = require('../validators')

function validator(validator,sub) {
    console.log(Validators)
    if(!Validators.hasOwnProperty(validator))
    // console.log(validator,Validators[validator]);
        console.log(`'${validator}' validator is not exist`)
    return async function(req, res, next) {
        try {
            const validated = await Validators[validator][sub].validateAsync(req.body)
            console.log(Validators[validator][sub]);
            req.body = validated
            next()
        } catch (err) {

            if (err.isJoi)
                return next(createHttpError(422, {message: err.message}))
            next(createHttpError(500))
        }   }
    }
module.exports = validator
