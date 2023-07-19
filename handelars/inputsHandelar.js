function checkIfDataThere(data) {
    return  new Promise((resolve, reject) => {
    if (typeof data === "string" && data != "") {
      resolve("Data Is Here ");
    } else {
      reject("data Not here ");
    }
  }); 
}
function checkIfDataLength(data,elength) {
    return  new Promise((resolve, reject) => {
    if (data.length < elength ) {
      resolve("length Is vaild");
    } else {
      reject("length Is invaild");
    }
  }); 
}

module.exports = {checkIfDataThere ,checkIfDataLength }