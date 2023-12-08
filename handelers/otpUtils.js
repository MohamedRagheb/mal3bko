

const otpGenerator = require('otp-generator');
module.exports  = ()=>{
return otpGenerator.generate(6,{
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
})
}

