const firebase = require('../config/firebase');

module.exports = {
  // Firebase confirms authentication through
  // the presence of a currentUser under auth().
  isAuthenticated: (req, res, next) => {
    var user = firebase.auth().currentUser;
    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.redirect('/');
    }
  },
}