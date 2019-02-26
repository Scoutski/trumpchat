var admin = require('firebase-admin');
var serviceAccount = require('./firebase.json');

let defaultApp;

if (!defaultApp) {
  // Firebase connection
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL
  });

  defaultApp = admin;
}

module.exports = defaultApp;