// define the callback function that initializes the map
function initMap() {
    // create a new map object
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 62.000000, lng: 15.00000 }, // set the map center
        zoom: 4 // set the zoom level
    });
}

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var locations = [
      { lat: 40.785091, lng: -73.968285 },
      { lat: 40.748817, lng: -73.985428 },
      { lat: 40.731858, lng: -74.002347 }
    ];
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],
      });
    });
    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  