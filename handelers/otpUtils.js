

const otpGenerator = require('otp-generator');
const  createOtpCode = ()=>{
return otpGenerator.generate(6,{
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
})
}
module.exports = {createOtpCode}
