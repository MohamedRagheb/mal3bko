const errorHandelarAsMidelleWare = (error, req, res, next) => {
  //   console.log(error);
  if (error.length > 0) {
    res.status(400).json({
      error: error,
    });
  }
  next();
};
module.exports = errorHandelarAsMidelleWare;
