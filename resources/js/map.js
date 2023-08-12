(function () {
    let lat = document.querySelector('#lat').value || -34.60374120522355;
    let lng = document.querySelector('#lng').value || -58.38156419904497;
    let marker;

    // Carga la vista inicial del mapa
    const map = L.map('map').setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://localhost:8080/"><span style="font-weight:bold;">Bienes</span>Raices</a>'
    }).addTo(map);

    // Añade un Marker
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(map);

    // Deteccion movimiento del Marker
    const geocodeService = L.esri.Geocoding.geocodeService();

    marker.on('moveend', e => {
        const position = e.target.getLatLng();

        map.panTo(new L.LatLng(position.lat, position.lng));

        geocodeService.reverse().latlng(position, 13).run((err, result) => {
            marker.bindPopup(result.address.LongLabel);

            document.querySelector('.street').textContent = result?.address?.Address ?? '';
            document.querySelector('#street').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        })
    })
})()