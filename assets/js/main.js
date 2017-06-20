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
			icon:'http://www.gps-routes.co.uk/routes/home.nsf/cycleicon.png'
		});
		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}
	var funcionError = function(error){
		alert("Tenemos un problema para encontrar tu ubicación");
	}
	function initialize() {//autocompletar direcciones
		var inputOrigen = document.getElementById('origen');
		var autocomplete = new google.maps.places.Autocomplete(inputOrigen);
		var inputDestino = document.getElementById('destino');
		var autocompletados = new google.maps.places.Autocomplete(inputDestino);
}
google.maps.event.addDomListener(window, 'load', initialize);
}
