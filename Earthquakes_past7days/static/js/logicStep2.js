// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };
// Create the may object with center, zoom lever and default layer.
  let map = L.map('map', {
    center: [39.5, -98.5], 
    zoom: 3, 
    layers: [streets]
  });

// Pass out map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);
// Creating a GeoJSON layer with the retrieved data.0
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.marker(latlng);
  },
  style: styleInfo
  }).addTo(map);
  
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(),
      stroke: true,
      weight: 0.5
    };
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.    
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  } 

});