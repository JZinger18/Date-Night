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


var queryUrl = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2017-07-01&api_key=72f30fe7c45d9a6791b64485aa95f563";


//Ajax get request
$.ajax({
  url: queryUrl,
  method: 'GET'
})
  .done(function(response){

    console.log(response);
    var movie_list = response.results
    var limit = 4
    console.log(movie_list)
    for(var i = 0; i< limit; i++) {
      //hold all content generated for movie poster
     holder = $("<div class='col-md-3'>")
     //create a thumbnail
   movieDiv = $("<div class='thumbnail'>")
   //holds gif image
   movieImg = $('<img class="gif" data-state="still img-responsive">');

   imgUrl = "http://image.tmdb.org/t/p/w300/"
   //add gif
   imgPoster = imgUrl + movie_list[i].poster_path;



   movieImg.attr("src", imgPoster)

   movieCaptionDiv = $("<div class='caption'>")

   movieCaptionP = $('<p>')

   movieCaptionP.text(movie_list[i].overview)


//Append gifImage to Gif div
movieDiv.append(movieImg)
holder.append(movieDiv)
movieCaptionDiv.append(movieCaptionP)
holder.append(movieCaptionDiv)

//Append gifDiv to HTML
$('#movie-sect').append(holder)

}
    })







})
