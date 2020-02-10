var map, places, infoWindow;
var markers = [];
var autocomplete;
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

function reset() {
    location.reload();
}

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 53.3498, lng: -6.2603 },
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: true
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });

    // City Locations
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
        document.getElementById('autocomplete')), {
            types: ['(cities)'],
        });
        places = new google.maps.places.PlacesService(map);

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

    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();

            for (var i = 0; i < results.length; i++) {

                // Marker animation
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP
                });
                                    
            // Info

            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
            setTimeout(dropMarker(i), i * 5);
            addResult(results[i], i);
        }
    }
    });
    }


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    }
}

function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter;


var tr = document.createElement('tr');
tr.style.backgroundColor = (i % 2 === 0 ? '#fffff' : '#f0f0f0');
tr.onclick = function() {
    google.maps.event.trigger(markers[i], 'click');
};

var iconTd = document.createElement('td');
var nameTd = document.createElement('td');
var icon = document.createElement('img');
icon.setAttribute('class', 'placeIcon');
icon.setAttribute('classNam', 'placeIcon');
var name = document.createTextNode(results.name);
iconTd.appendChild(icon);
nameTd.appendChild(name);
tr.appendChild(iconTd);
tr.appendChild(nameTd);
results.appendChild(tr);
}

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

function showInfoWindow() {
    var marker = this;
    places.getDetails({ placeID: marker.placeResult.place_id },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}

// Information loading into HTML elements
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="childIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +'" target="_blank" >' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity; 

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent = place.formatted_phone_number;
    } else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }
}


      