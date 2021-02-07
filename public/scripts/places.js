// Get API Location
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const {latitude, longitude} = position.coords;
        setMap(latitude, longitude);
    }, function(err) {
        setMap(-27.222633, -49.6455874);
    })
} else {
    setMap(-27.222633, -49.6455874);
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

    function addMarker({id, name, img, lat, lng, search}) {
        // Create Stuture for Icon
        let container = document.createElement('div');
        let image = document.createElement('img');
        let contentInfos = document.createElement('a');
        let infos = document.createElement('div');
        let point = document.createElement('p');

        Object.assign(container.style,{
            display:'flex',
            flexDirection: 'column'
        });

        Object.assign(image.style,{
            width: '90px',
            height: '45px',
            cursor: 'default',
            borderRadius: '10px 10px 0 0'
        });

        Object.assign(infos.style,{
            background: '#0dcd75',
            borderRadius: '0 0 10px 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px 6px 11px',
            fontWeight: 'normal',
            maxWidth: '90px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        });

        infos.classList.add('arrow-down');
        image.setAttribute('src', img);
        // point.setAttribute('href', `/edit-search?search=${search}&id=${id}`);
        contentInfos.setAttribute('href', `/point?search=${search}&id=${id}`);
        point.innerHTML = name;

        // Layout construction
        infos.appendChild(point);
        container.appendChild(image);
        contentInfos.appendChild(infos);
        container.appendChild(contentInfos);

        // Create icon with 'div'
        const icon = L.divIcon({className: 'none'});

        // Create and add Marker
        L.
        marker([lat, lng], { icon })
        .addTo(map)

        const marker = document.querySelectorAll('#mapid .leaflet-marker-icon');
        marker[(marker.length-1)].appendChild(container);

        Object.assign(marker[(marker.length-1)].style,{
            width:'max-content',
            height: 'max-content',
            marginLeft: '-41px',
            marginTop: '-95px'
        });
    }

    const placesSpan = document.querySelectorAll('.places span')

    placesSpan.forEach(value => {
        const place = {
            id: value.dataset.id,
            name: value.dataset.name,
            img: value.dataset.img,
            lat: value.dataset.lat,
            lng: value.dataset.lng,
            search: value.dataset.search
        }

        addMarker(place)
    });
}