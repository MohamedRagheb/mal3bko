const otpGenerator = require('otp-generator');
exports.createOtpCode = ()=>{
return otpGenerator.generate(6,{
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
})
}
