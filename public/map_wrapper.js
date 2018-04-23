const MapWrapper = function (container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });

  this.markers = [];
}

MapWrapper.prototype.addMarker = function (coords, contentString) {
  const marker = new google.maps.Marker({
    map: this.googleMap,
    position: coords,
    animation: google.maps.Animation.DROP
  });


  const infoWindow = new google.maps.InfoWindow ({
    content: contentString,
    maxWidth: 500
  });

  marker.addListener('click', function () {
    infoWindow.open(this.googleMap, marker);
  });
}
