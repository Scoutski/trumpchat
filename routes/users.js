const express = require('express');
const router = express.Router();
const defaultApp = require('../config/firebase');
const firestore = defaultApp.firestore();

// Create new user
router.post('/', (req, res) => {
  const userDetails = req.body;
  /* { email, password, displayName, isAdmin } */

  defaultApp.auth().createUserWithEmailAndPassword(
    userDetails.email,
    userDetails.password
  )
    .then((user) => {
      console.log('Successfully created new user:', user.toJSON());
      // Create a separate user record to store
      // whether or not the user is an admin.
      firestore.collection("users").doc(user.email).set({
        authUid: user.uid,
        displayName: user.displayName,
        isAdmin: userDetails.isAdmin || false
      });
    })
    .catch((err) => {
      console.error('Unable to create new user:', err);
    });

  res.send('Attempted to create a user');
});

module.exports = router;
