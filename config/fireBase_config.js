var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mla3bko.appspot.com/",
});
const bucket = admin.storage().bucket();
module.exports = { bucket };
