// Set options from Leaflet
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
}

// Get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

// Get Dark Mode
const locale = JSON.parse(localStorage.getItem('darkMode'));
let styleMap;

if(locale.value){
    styleMap = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
} else {
    styleMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}

// Create Map
const map = L.map('mapid', options).setView([lat, lng], 15);

// Create and add Tilelayer
L.tileLayer(
    styleMap, 
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map);

// Create Icon
const icon = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize: [50, 75],
    iconAnchor: [29, 68],
})

// Create and add Marker
L.
marker([lat, lng], { icon })
.addTo(map)

// Function to Back
const back = document.querySelector('header a');
back.onclick = function() {
    window.history.back();
};

// Collections Itens
let temp = new Array();
const input = document.querySelector('input[name="items"]');
const arr = input.value.split(',');

arr.forEach(value => {
    let item = document.querySelector(`li[data-id='${value.trim()}']`);
    item.classList.add('enable');
});