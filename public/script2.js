$(document).ready(function() {

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

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}

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
      //mdl card to hold movie poster
     holder = $("<div class='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col mdl-cell--6-col-tablet mdl-cell--4-col-phone mdl-grid'>")
     //create a media slot for card in mdl for movie poster
   movieDiv = $("<div class='mdl-card_media'>")
   //holds gif image
   movieImg = $('<img/>');

  //  overviewDiv = $('<div class="side mdl-card__supporting-text">')



   imgUrl = "https://image.tmdb.org/t/p/w300/";
   //add gif
   imgPoster = imgUrl + movie_list[i].poster_path;
   movieText = movie_list[i].overview
   console.log(imgPoster)


   movieImg.attr("src", imgPoster)


  //  $(overviewDiv).text(movieText);
   $(movieDiv).append(movieImg);
  //  $(movieDiv).append(overviewDiv)

   $(holder).append(movieDiv)
  $('#poster-target').append(holder);


              //  <img class= "side" src='http://gdj.graphicdesignjunction.com/wp-content/uploads/2011/12/grey-movie-poster.jpg'>
              // <div class="side mdl-card__supporting-text">
              //   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              //   Aenan convallis.
              // </div>
              // </div>


  //  if(!(typeof(componentHandler) == 'undefined')){
  //      componentHandler.upgradeAllRegistered();
  //  }




  //  movieCaptionDiv = $("<div class='caption'>")
   //
  //  movieCaptionP = $('<p>')
   //
  //  movieCaptionP.text(movie_list[i].overview)

 }






})

//Maps API beginning
window.onload = getMyLocation;

//


// Initialize Maps.
var map
function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
    console.log("getMyLocation");
  } else {
    alert("No GPS Available");
    console.log("No GPS Available");
  }
}



function displayLocation(position) {
  // Longitude and Latitude values obtained from HTML 5 API.
  console.log("entered displayLocation");
  var longitude = position.coords.longitude;
  var latitude = position.coords.latitude;

// Creating new object for using longitude and latitude values with google map.
 var latLng = new google.maps.LatLng(latitude, longitude);
 console.log("about to call show map");

showMap(latLng);

console.log("after call to show map");


addNearByPlaces(latLng);
 console.log("called nearbyplaces");
 //apiMarkerCreate(latLng);
 console.log("called marker create");
}


// Sets up map options like zoom ect.
function showMap(latLng) {
  var mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

 // Assigning the map div element.
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}




// add nearby to map
function addNearByPlaces(latLng) {
  var nearByService = new google.maps.places.PlacesService(map);

 var request = {
    location: latLng,
    radius: "10000",
    type: ["restaurant"]
  };


 nearByService.nearbySearch(request, searchNearBy);
  console.log("after nearbySearch");
}

function searchNearBy(results, status) {
  console.log("Entered searchNearBy");
  console.log(results);

    var eats = results;
    console.log(eats)
    var limit2 = 10
    for(var y = 0; y < limit2; y++) {
      // name = eats[i].name
      name = eats[y].name;
      console.log(name);


    list = $("<ul class='mdl-list'>")
      //create a media slot for card in mdl for movie poster
    listItems = $("<li class='mdl-list__item'>")
    //holds gif image
    item = $("<span class='mdl-list__item-primary-content'>");
    text = name

    $(item).text(text)
    $(listItems).append(item)
    $(list).append(listItems)
    $('#rest').append(list)


  }
  console.log(status);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("PlacesServiceStatus.OK");
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      apiMarkerCreate(place.geometry.location, place);
    }
  }
}


function apiMarkerCreate(latLng, placeResult) {
  console.log("Entered apiMarkerCreate");
  console.log(latLng);
  console.log(placeResult);






  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true
  }
// Set up marker object to mark the location on the map.
  var marker = new google.maps.Marker(markerOptions);

 if (placeResult) {
  var content = placeResult.name+"<br/>"+placeResult.vicinity;
  windowInfoCreate(marker, latLng, content);
}

}


function windowInfoCreate(marker, latLng, content) {
 var infoWindowOptions = {
   content: content,
   position: latLng
 };

var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

google.maps.event.addListener(marker, "click", function() {
  infoWindow.open(map);
});

}

})
