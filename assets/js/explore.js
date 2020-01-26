function reset () {
    location.reload();
}

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 53.3498, lng: -6.2603 },
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: true
    });

    var infoWindow = new google.maps.infoWindow({
        content: document.getElementById('info-content')
    });

    autocomplete = new google.maps.places.Autocomplete()

        document.getElementById('autocomplete')), {
            types: ['(cities)'],
        });
        places = new google.maps.places.PlacesServices(map);

        autocomplete.addListener()
