
/*
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
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('sign-in').textContent = 'Sign out';
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});

*/

// Maps API beginning
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
 //addNearByPlaces(latLng);
 //apiMarkerCreate(latLng); 
 
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
    radius: 10000,
    types: ["restaurant", "movies"]
  };

  nearByService.nearbySearch(request, searchNearBy);
}

function searchNearBy(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {

    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      apiMarkerCreate(place.geometry.location, place);
    }
  }
}


function apiMarkerCreate(latLng, placeResult) {
  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true
  }
// Set up marker object to mark the location on the map.
var marker = google.maps.Marker(markerOptions);

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
