const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

let admin;

if (!admin) {
  admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL,
  });
}

module.exports = admin;