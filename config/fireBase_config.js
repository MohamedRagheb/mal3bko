const admin = require("firebase-admin"); // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const serviceAccount = require("./mla3bko-firebase-adminsdk-khscy-6c3dcc5734.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mla3bko.appspot.com",
});
// firebase.initializeApp(firebaseConfig);
module.exports = { admin };
