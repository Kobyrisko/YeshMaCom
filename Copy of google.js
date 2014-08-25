var map, autocomplete;
function initialize() {
	  autocomplete = new google.maps.places.Autocomplete(
     (document.getElementById('autocomplete')),
      { types: ['geocode'] });
	geocoder = new google.maps.Geocoder();
  var mapOptions = {
  	
    zoom: 15,
    center: new google.maps.LatLng(31.9018223, 35.01362629999994)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      console.log(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


google.maps.event.addDomListener(window, 'load', initialize);
