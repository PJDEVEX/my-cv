// Initialize and add the map
function initMap() {
    // The location of Uluru
    const gavle = { lat: 60.67488, lng: 17.141273 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: gavle,
    });
}
