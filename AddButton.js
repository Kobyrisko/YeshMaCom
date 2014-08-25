var counter = 0;

$(document).on("click", "#page2 #list li", function(){
AttributesAdder.liClicked($(this));
});

$(document).on("click", "#getStartedButton", function(){
$.mobile.changePage("#page2", {transition: "slide"});
});

	var AttributesAdder = 
	{
		onclick : function()
		{
			var div = document.getElementById("updateDiv");
			if(counter === 0)
			{
			var header = document.createElement("h1");
			header.id = "h1h1";
			var headerText = document.createTextNode("Text Text");
			header.appendChild(headerText);
			div.appendChild(header);
			counter++;
			}
			else
			{
				var h = document.getElementById("h1h1");
				h.style.textAlign="center";
			}
		},
		editTask : function() 
		{
			var placeToView = $("#singleTask div[data-role=header] h1").text();
			var dataToEdit = main.retrieveData(placeToView);
			$("#title").placeToView(taskToEdit);
			$("#task").placeToView(dataToEdit.task);
			$("#date").placeToView(dataToEdit.date);
			$("#time").placeToView(dataToEdit.time);
			window.localStorage.removeItem(taskToEdit);
		},
	
		submitTask : function() 
		{
			if (main.mandatoryValidation()) 
			{
				var taskTitle = $("#title").val();
				var session = 
				{
					id : window.localStorage.length,
					placeName : $("#task").val(),
					placeInfo : $("#date").val(),
				};
				if (typeof (Storage) != "undefined") {
					// Store task at local storage 
					window.localStorage.setItem(taskTitle, JSON.stringify(session));
				}
				else 
				{
					alert("Sorry, your browser does not support Web Storage...");
				}
				main.notification.addNotification(taskTitle, session);
				$.mobile.changePage($("#home"));
			}
		},
		
		mandatoryValidation : function() 
		{
		// Validating all mandatory fields are filled
		var isValid = true;
		if ($("#placeName").val() == "") {
			alert("placeName is a mandatory field!");
			isValid = false;
		} else if ($("#placeInfo").val() == "") {
			alert("placeInfo is a mandatory field!");
			isValid = false;
		}
		else if ($("#address").val() == "") {
			alert("address is a mandatory field!");
			isValid = false;
		}
			return isValid;
		},
		submitFormAjax : function(){
			$("#addNewPlaceForm").submit(function(e)
			{
			if(AttributesAdder.mandatoryValidation())
			{
				var formData = new FormData($(this)[0]);
				//var postData = $(this).serializeArray();
			    var formURL = $(this).attr("action");
			    $.ajax(
			    {
			        url : 'http://localhost:8080/YeshMaComServer/PlacesServlet/addNewPlace',
			        type: "POST",
			       cache: false,
        		   contentType: false,
        		   processData: false,
        		   data: formData,
        		   dataType: "json",
        		  // xhrFields: {
				   //withCredentials: true
   //}
			    });
			    console.log(formData);
			    console.log(formURL);
			    e.preventDefault(); //STOP default action
			    //$.mobile.changePage($("#page3"));
			    
			}
				e.preventDefault(); //STOP default action
			});
			},
			
			liClicked : function(e){
				var oChildrenOfE = $(e).children();
				var placeID = $(e).find("h2").html();
				var currentPlace = placesData.jsonObject.places[placeID-1];
				$('#currentPlaceName').html(currentPlace.placeName);
				$('#currentPlaceID').html(currentPlace.placeID);
				$('#currentPlaceInfo').html(currentPlace.placeInfo);
				$('#currentPlaceAddress').html(currentPlace.placeAddress);
				$('#currentPlaceCapacity').html(currentPlace.placeCapacity);
				$('#currentPlaceLastUpdated').html(currentPlace.placeLastUpdate);
				$.mobile.changePage($("#placePage"));
				//console.log(e);
				//e.stopPropagation();
			}
};

