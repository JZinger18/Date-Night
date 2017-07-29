var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request,callback);

 // service.textSearch(request, callback);
}

function createMarker(latLng, placeResult) {
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


function callback(results, status) {
  console.log("Entered callback");
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("Callback successful");
    // for (var i = 0; i < results.length; i++) {
    //   var place = results[i];
    //   createMarker(results[i]);
    // }
  }
}