var express = require('express');
var router = express.Router();
var defaultApp = require('../config/firebase');
var db = defaultApp.database();

/* GET users listing. */
router.post('/', (req, res) => {
  const userDetails = req.body;
  /* { email, password, displayName, isAdmin } */

  defaultApp.auth().createUser(userDetails)
    .then((user) => {
      console.log('Successfully created new user:', user.toJSON());
      const userRef = db.ref("users").push();
      // Create a separate user record to store
      // whether or not the user is an admin.
      userRef.set({
        authUid: user.uid,
        isAdmin: userDetails.isAdmin || false
      });
    })
    .catch((err) => {
      console.error('Unable to create new user:', err);
    });

  res.send('Attempted to create a user');
})

// Fetch list of all users.
router.get('/', function(req, res, next) {
  const uid = req.params.uid || '';
  admin.auth().getUser(uid)
    .then((userRecord) => {
      console.log('Successfully fetched user data:', userRecord.toJSON());
    })
    .catch((err) => {
      console.log('Unable to fetch user data, details:', err);
    });
  res.send('respond with a resource');
});

module.exports = router;
