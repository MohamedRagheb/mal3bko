const commonErrors = {
  NotAuthorized: {
    errorCode: 401,
    errorMessage: "Not Authorized",
  },
  BadRequest: {
    errorCode: 400,
    errorMessage: "Bad Request",
  },
  NotAuthorizedLogin: {
    errorCode: 401,
    errorMessage: "UserName or password incorrect",
  },
  Success: {
    errorCode: 200,
    errorMessage: "Success",
  },
  Forbidden: {
    errorCode: 403,
    errorMessage: "Forbidden",
  },
  NotFound: {
    errorCode: 404,
    errorMessage: "Not Found",
  },
};

module.exports = commonErrors;
