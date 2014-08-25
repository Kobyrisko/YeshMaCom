var placesData =
{
	jsonObject : '',
	requestURL : 'http://localhost:8080/YeshMaComServer/PlacesServlet/getAllPlaces',
	getAllPlaces : function()
	{
		initialize();
		$.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.mobile.pushStateEnabled = false;
		$.post(placesData.requestURL, function(data)
		{
			placesData.jsonObject = data;
			if(data.places && data.places.length > 0)
			{
				var output='';
				$.each(data.places, function(i , place){
					console.log(place.placeID + " "+ place.placeInfo);
					output += '<li>';
					output += '<a>';
					output += '<img class ="small" src="';
					output +=  place.placeID;
					output += '.jpeg" />';
					output += '<h2>';
					output += place.placeID;
					output += '</h2>';
					output += '<h1>';
					output += place.placeName;
					output += '</h1>';
					output += '<p>';
					output += place.placeInfo;
					output += '</p>';
					output += '<p>';
					output += place.placeAddress;
					output += '</p>';
					output += '<p>';
					output += place.placeCapacity;
					output += '</p>';
					output += '<p>';
					output += place.placeLastUpdate;
					output += '</p>';
					output += '<span class="ui-li-count">'+place.placeCapacity+'%</span>';
					output += '</a>';
					output += '</li>';
				});
				$('#list').html(output);
			}
		});
	}
};


