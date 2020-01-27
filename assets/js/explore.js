

var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 53.3498, lng: -6.2603 },
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: true
    });

    infoWindow = new google.maps.infoWindow({
        content: document.getElementById('info-content')
    });

    // City Locations
    autocomplete = new google.maps.places.Autocomplete()

        document.getElementById('autocomplete'), {
            types: ['(cities)'],
        };
        places = new google.maps.places.PlacesServices(map);

        autocomplete.addListener('place_changed', onPlaceChanged);
    }

    // Zoom function
    function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(20);
        search();
    }
}

// Locations search in selected city
function search() {
    var locations = document.getElementById("locations").value;

    var search = {
        bounds: map.getBounds(),
        types: [locations]
    };

    places.nearbySearch(search, function(results, status){
        if (status === google.maps.places.PlacesServices.OK) {
            clearResults();
            clearMarkers();

            for (var i = 0; i < results.length; i++) {
                // Marker animation
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP
                });
                marker.addListener('click', toggleBounce);
            }

            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }

            // Info

            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
            setTimeout(dropMarker(i), i * 5);
            addResult(results[i], i);
        }
    })
    };


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers[];
}

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    }
}

