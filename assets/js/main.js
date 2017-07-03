function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});
 	function buscar(){
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	document.getElementById("encuentrame").addEventListener("click", buscar);
	var latitud,longitud;
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;
		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon: 'http://www.gps-routes.co.uk/routes/home.nsf/cycleicon.png'
		});
		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}
	var funcionError = function(error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}
    var inputOrigen = (document.getElementById('origen'));
    var autocomplete = new google.maps.places.Autocomplete(inputOrigen);
        autocomplete.bindTo("bounds", map);
    var inputDestino = (document.getElementById('destino'));
    var autocomplete = new google.maps.places.Autocomplete(inputDestino);
        autocomplete.bindTo("bounds", map);

        //De aquí hasta abajo no entiendo qué hace - lo copié para ver si funcionaba
        var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		document.getElementById("origen").addEventListener("change", onChangeHandler);
    	document.getElementById("destino").addEventListener("change", onChangeHandler);
    function lineaRuta(directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById("origen").value,
            destination: document.getElementById('destino').value,
            travelMode: "DRIVING"
            },
        function(response, status) {
            if (status === "OK") {
                directionsDisplay.setDirections(response);
            } else {
                window.alert("Ruta no disponible"+ status);
            }
        });
    }
    	directionsDisplay.setMap(map);
        //onChangeHandler = Agregar una propiedad de seguimiento a una definición de lenguaje específico de dominio
        var onChangeHandler = function(){
            //Servicio de indicaciones
        lineaRuta(directionsService, directionsDisplay);
    }; 
    
    document.getElementById("ruta").addEventListener("click",onChangeHandler); 
}

