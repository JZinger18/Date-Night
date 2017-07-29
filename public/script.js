// Initialize Firebase



var config = {
  apiKey: "AIzaSyAvOeLPMADwYKvRC8-JLKGZbpIxY-hObgc",
  authDomain: "date-night-e35f7.firebaseapp.com",
  databaseURL: "https://date-night-e35f7.firebaseio.com",
  projectId: "date-night-e35f7",
  storageBucket: "date-night-e35f7.appspot.com",
  messagingSenderId: "156260956808"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: 'index2.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    // console.log(user.val())
    if (user) {
      // User is signed in.

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      console.log(uid)
      console.log(user.displayName)
      // user.getIdToken().then(function(accessToken) {
      //   document.getElementById('sign-in-status').textContent = 'Signed in';
      //   document.getElementById('sign-in').textContent = 'Sign out';
      //   document.getElementById('account-details').textContent = JSON.stringify({
      //     displayName: displayName,
      //     email: email,
      //     emailVerified: emailVerified,
      //     phoneNumber: phoneNumber,
      //     photoURL: photoURL,
      //     uid: uid,
      //     accessToken: accessToken,
      //     providerData: providerData
      //   }, null, '  ');
      // });
     }
    // else {
    //   // User is signed out.
    //   document.getElementById('sign-in-status').textContent = 'Signed out';
    //   document.getElementById('sign-in').textContent = 'Sign in';
    //   document.getElementById('account-details').textContent = 'null';
    // }
  }, function(error) {
    console.log(error);
  });
};

$(document).ready(function() {
    initApp()


})



// var queryUrl = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2017-07-01&api_key=72f30fe7c45d9a6791b64485aa95f563";
//
//  //Ajax get request
//  $.ajax({
//    url: queryUrl,
//    method: 'GET'
//  })
//    .done(function(response){
//
//      console.log(response);
//      var movie_list = response.results
//      var limit = 5
//      console.log(movie_list)
//      for(var i = 0; i< limit; i++) {
//        //hold all content generated for movie poster
//       holder = $("<div class='col-md-4'>")
//       //create a thumbnail
//     movieDiv = $("<div class='thumbnail'>")
//     //holds gif image
//     movieImg = $('<img class="gif" data-state="still">');
//
//     imgUrl = "http://image.tmdb.org/t/p/w300/"
//     //add gif
//     imgPoster = imgUrl + movie_list[i].poster_path;
//
//
//
//     movieImg.attr("src", imgPoster)
//
//     movieCaptionDiv = $("<div class='caption'>")
//
//     movieCaptionP = $('<p>')
//
//     movieCaptionP.text(movie_list[i].overview)
//
//
// //Append gifImage to Gif div
// movieDiv.append(movieImg)
// holder.append(movieDiv)
// movieCaptionDiv.append(movieCaptionP)
// holder.append(movieCaptionDiv)
//
// //Append gifDiv to HTML
// $('#image-holder').append(holder)
//
// }
//      })
//
