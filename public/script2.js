$(document).ready(function() {

console.log('hello')

var config = {
  apiKey: "AIzaSyAvOeLPMADwYKvRC8-JLKGZbpIxY-hObgc",
  authDomain: "date-night-e35f7.firebaseapp.com",
  databaseURL: "https://date-night-e35f7.firebaseio.com",
  projectId: "date-night-e35f7",
  storageBucket: "date-night-e35f7.appspot.com",
  messagingSenderId: "156260956808"
};
firebase.initializeApp(config);



var user = firebase.auth().currentUser;

// if (user != null) {
  // user.providerData.forEach(function (profile) {
  //   console.log("Sign-in provider: "+profile.providerId);
  //   console.log("  Provider-specific UID: "+profile.uid);
  //   console.log("  Name: "+profile.displayName);
  //   console.log("  Email: "+profile.email);
  //   console.log("  Photo URL: "+profile.photoURL);
  // });
// }


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName
    console.log(name)
  } else {
    console.log('no user')
    // No user is signed in.
  }
});

})
