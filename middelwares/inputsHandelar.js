function checkIfAllDataThere(req, res, next) {
  let body = req.body;
  const keys = Object.keys(body);
  let error = [];
  keys.forEach((el) => {
    const elInObject = body[el];
    if (elInObject === null || elInObject === undefined) {
      console.log("er");
      error.push({code:400,message:`input ${el} is Emapty`})
    }

    // Check if elInObject is an empty string
    if (typeof elInObject === "string" && elInObject.trim() === "") {
      console.log("er");
      error.push({code:400,message:`input ${el} is Emapty`})

    }

    // Check if elInObject is an empty array
    if (Array.isArray(elInObject) && elInObject.length === 0) {
      console.log("er");
      error.push({code:400,message:`input ${el} is Emapty`})

    }

    // Check if elInObject is an empty object
    if (
      typeof elInObject === "object" &&
      Object.keys(elInObject).length === 0
    ) {
      console.log("er");
      error.push({code:400,message:`input ${el} is Emapty`})
    }
  });

  next(error);
}
function checkIfDataLength(data, elength) {
  return new Promise((resolve, reject) => {
    if (data.length < elength) {
      resolve("length Is vaild");
    } else {
      reject("length Is invaild");
    }
  });
}

module.exports = { checkIfAllDataThere, checkIfDataLength };
