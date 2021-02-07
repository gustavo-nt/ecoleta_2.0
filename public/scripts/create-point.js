// Get API Location
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const {latitude, longitude} = position.coords;
        var lat = latitude;
        var long = longitude;
        setMap(lat, long);
    }, function(err) {
        var lat = -27.222633;
        var long = -49.6455874;
        setMap(lat, long);
    })
} else {
    const lat = -27.222633;
    const long = -49.6455874;
    setMap(lat, long);
}

function setMap(lat, lng) {
    // Get Dark Mode
    const check = JSON.parse(localStorage.getItem('darkMode'));
    let styleMap;

    if(check.value){
        styleMap = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
    } else {
        styleMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }

    // Create map
    const map = L.map('mapid').setView([lat, lng], 15);

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

    let marker;

    // Create and add Marker
    map.on('click', (event) => {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;

        document.querySelector("[name=lat]").value = lat;
        document.querySelector("[name=lng]").value = lng;

        // Remove icon
        marker && map.removeLayer(marker);

        // Add icon layer
        marker = L.marker([lat, lng], {icon})
        .addTo(map);
    })
}

// Get States for IBGE Api
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json())
    .then( states => {
        states.forEach(value => {
            ufSelect.innerHTML += `<option value=${value.id}>${value.nome}</option>`
        });
    });
}

populateUFs();

// Get Cities for IBGE Api
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`;

    citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        cities.forEach(value => {
            citySelect.innerHTML += `<option value="${value.nome}">${value.nome}</option>`
        });

        citySelect.disabled = false;
    });
}

// Change state
document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Variables of DOM
let selectedItems = [];
const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");
const upload = document.querySelector('.file');
const field = document.querySelector('.image');
const noImage = document.querySelector('.upload');
const delet = document.querySelector('#delet');
const whats = document.querySelector('input[name=whatsapp]');
const hover = document.querySelector('#img').getAttribute('src');

itemsToCollect.forEach(item => {
    item.addEventListener("click", handleSelectedItem);
});

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    const alreadySelected = selectedItems.findIndex(item => item === itemId);

    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId);
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId); 
    }

    collectedItems.value = selectedItems;
}

// Preview Imagem input type file
upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    if(!file) {
        document.querySelector('#img').setAttribute('src', '');
        field.style.border = '1px dashed var(--text-results)';
        noImage.style.display = 'flex';
    } else {
        fileReader.onload = function() {
            document.querySelector('#img').setAttribute('src', fileReader.result);
        }
    
        field.style.border = 0;
        noImage.style.display = 'none';
        fileReader.readAsDataURL(file);
    }

    enableHover(true);
});

// Functon of Delet Image
delet.addEventListener('click', function(event) {
    upload.value = '';
    document.querySelector('#img').setAttribute('src', '');
    field.style.border = '1px dashed var(--text-results)';
    noImage.style.display = 'flex';
    enableHover(false);
});

// Hover JavaScript
if(hover !== ' ') {
    enableHover(false);
} else {
    enableHover(true);
}

function enableHover(enable) {
    if(enable) {
        field.addEventListener('mouseover', function() {
            delet.style.display = 'block';
        });
        
        field.addEventListener('mouseout', function() {
            delet.style.display = 'none';
        });
    } else {
        field.addEventListener('mouseover', function() {
            delet.style.display = 'none';
        });
        
        field.addEventListener('mouseout', function() {
            delet.style.display = 'none';
        });
    }
}   

// Mask Input Number
function mask(o) {
    setTimeout(function() {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}
  
function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");

    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (r.length > 1) {
        r = r.replace(/^(\d*)/, "($1");
    }

    return r;
}