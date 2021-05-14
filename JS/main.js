function displaywelcome() {
    Swal.fire({

        icon: 'info',
        text: 'Bienvenidos al visor de metrópolis binacionales en Ámerica Latina y el Caribe.' +
            ' Puedes hacer click en cada ubicación para ver cada una de las ciudades a detalle'
    }
    )

}

//Map section
let center = [4, -74]

const map = L.map('mapid', {
    center: center,
    zoom: 3
});

const base = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',).addTo(map)

//Functions for the PopUp
function GetFullZoom() {
    map.setView(center, 3)
    map.closePopup();
}

function ClosePopup() {
    map.closePopup()
}


//Layer cities with an div Icon for display the label
const city = L.geoJson(cities, {
    pointToLayer: function (feature, latlng) {
        let lat = latlng.lat + 0.002
        let lng = latlng.lng - 0.003
        let position = [lat, lng]
        return L.marker(position, {
            icon: L.divIcon({
                iconSize: null,
                className: 'label',
                html: '<div>' + feature.properties.Cities + '</div>'
            })
        })
    }
})

//Load layer
const geoJsonLayer = L.geoJson(ciudades, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.AwesomeMarkers.icon({
                icon: 'home',
                prefix: 'glyphicon',
                markerColor: 'darkred',

            })
        });
    },
    onEachFeature: function (feature, layer) {
        const { properties } = layer.feature

        if (!properties.Anotación) {

            layer.bindPopup("<h1> Metrópolis binacionales</h1> <br> <table class='table table-striped table-bordered'> <tr> <td> <strong> Ciudades </strong> </td> <td>" + properties.Name + " </td> </tr>" +
                "<tr> <td> <strong> Países fronterizos</strong> </td> <td>" + properties.PAISES + "</td>  </tr> </table>" +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-success' onClick='ClosePopup()' > Cerrar Pop Up </button> </div> <br>" +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-danger' onClick='GetFullZoom()' > Volver a la vista original </button> </div> <br> "
            )
        } else {
            layer.bindPopup("<h1> Metrópolis binacionales</h1> <br> <table class='table table-striped table-bordered'> <tr> <td> <strong> Ciudades </strong> </td> <td>" + properties.Name + " </td> </tr>" +
                "<tr> <td> <strong> Países fronterizos</strong> </td> <td>" + properties.PAISES + "</td>  </tr>" +
                "<tr> <td> <strong> Países fronterizos</strong> </td> <td>" + properties.Anotación + "</td>  </tr> </table> " +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-success' onClick='ClosePopup()' > Cerrar Pop Up </button> </div> <br>" +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-danger' onClick='GetFullZoom()' > Volver a la vista original </button> </div> <br> ")
        }

        layer.on('click', function (e) {

            let lat = e.latlng.lat + 0.02
            let lng = e.latlng.lng

            let CenterPopup = [lat, lng]
            map.setView(CenterPopup, 13.5)
            city.addTo(map)
        })
    },
}).addTo(map)

//Add event to remove the labels when the zoom is less than 10
map.on('zoomend', function (e) {
    let zoomlevel = map.getZoom();
    if (zoomlevel < 10) {
        map.removeLayer(city)
    }

})


