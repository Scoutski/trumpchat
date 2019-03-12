const express = require('express');
const router = express.Router();
const firebase = require("firebase");
const admin = require("../config/firebaseAdmin");

const authMiddleware = require('../middleware/auth');

router.get('/', (req, res) => {
  res.redirect('/signin');
});

router.get('/signin', (req, res) => {
  res.render('index', { title: 'Trump Chat' });
});

router.get('/chat', authMiddleware.isAuthenticated, (req, res) => {
  console.log('YAY, YOU ARE AUTHENTICATED');
  res.redirect('signin');
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      return firebase.auth().currentUser.getIdToken().then(idToken => {
        // Three days
        const expiresIn = 60 * 60 * 24 * 3 * 1000;
        admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
          // Set cookie policy for session cookie.
          const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: true
          };
          res.cookie('session', sessionCookie, options);
          return res.end(JSON.stringify({status: 'success'}),
            e => {
              res.status(401).send('UNAUTHORIZED REQUEST!');
            });;
        });
      });
    })
    .catch((error) => {
      // Incorrect log in details
      res.json({
        error: error.message
      });
    });
});

module.exports = router;
