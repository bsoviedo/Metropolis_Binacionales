function displaywelcome() {
    Swal.fire({

        icon: 'info',
        html: 'Bienvenidos al visor de <strong> AGLOMERADOS URBANOS Y METRÓPOLIS BINACIONALES EN AMÉRICA LATINA Y EL CARIBE. </strong>' +
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
        if (feature.properties.Habs === null && feature.properties.Densidad === null) {
            return L.marker(position, {
                icon: L.divIcon({
                    iconSize: null,
                    className: 'label',
                    html: '<div> <table class="table table-bordered" id="div_table"> <tr> <td> Nombre:</td> <td>' + feature.properties.Cities +
                        '</td> </tr> <tr> <td> Población: </td> <td>  No hay datos disponibles </td> </tr> ' +
                        '</td> </tr> <tr> <td> Densidad: </td> <td>   No hay datos disponibles   </td> </tr> </table> </div> '
                })
            })

        } else if (feature.properties.Habs != null && feature.properties.Densidad === null) {
            return L.marker(position, {
                icon: L.divIcon({
                    iconSize: null,
                    className: 'label',
                    html: '<div> <table class="table table-bordered" id="div_table"> <tr> <td> Nombre:</td> <td>' + feature.properties.Cities +
                        '</td> </tr> <tr> <td> Población: </td> <td>' + feature.properties.Habs + ' </td> </tr> ' +
                        '</td> </tr> <tr> <td> Densidad: </td> <td>   No hay datos disponibles   </td> </tr> </table> </div> '
                })
            })

        }
        else {
            return L.marker(position, {
                icon: L.divIcon({
                    iconSize: null,
                    className: 'label',
                    html: '<div> <table class="table table-bordered" id="div_table"> <tr> <td> Nombre:</td> <td>' + feature.properties.Cities +
                        '</td> </tr> <tr> <td> Población: </td> <td>  ' + feature.properties.Habs + ' Habs </td> </tr>' +
                        '</td> </tr> <tr> <td> Densidad: </td> <td>  ' + feature.properties.Densidad + ' </td> </tr> </table> </div> '
                })
            })
        }

    }, onEachFeature: function (feature, layer) {
        feature.layer = layer;
    }
}
)






//Load layer
const geoJsonLayer = L.geoJson(ciudades, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.AwesomeMarkers.icon({
                icon: 'home',
                prefix: 'glyphicon',
                markerColor: 'blue'

            })
        });
    },
    onEachFeature: function (feature, layer) {

        const { properties } = layer.feature

        if (!properties.Anotación) {

            layer.bindPopup("<h2> Aglomerados urbanos y metrópolis binacionales</h2> <br> <table class='table table-striped table-bordered'> <tr> <td> <strong> Ciudades </strong> </td> <td>" + properties.Name + " </td> </tr>" +
                "<tr> <td> <strong> Países fronterizos</strong> </td> <td>" + properties.PAISES + "</td>  </tr> </table>" +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-secondary' onClick='ClosePopup()' > Cerrar </button> </div> <br>" +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-info' onClick='GetFullZoom()' > Volver al inicio </button> </div> <br> "
            )
        } else {
            layer.bindPopup("<h2> Aglomerados urbanos y metrópolis binacionales</h2> <br> <table class='table table-striped table-bordered'> <tr> <td> <strong> Ciudades </strong> </td> <td>" + properties.Name + " </td> </tr>" +
                "<tr> <td> <strong> Países fronterizos</strong> </td> <td>" + properties.PAISES + "</td>  </tr>" +
                "<tr> <td> <strong> Países fronterizos</strong> </td> <td>" + properties.Anotación + "</td>  </tr> </table> " +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-secondary' onClick='ClosePopup()' > Cerrar </button> </div> <br>" +
                "<div class= 'd-grid gap-2'> <button type='button' class='btn btn-info' onClick='GetFullZoom()' > Volver al inicio </button> </div> <br> ")
        }

        layer.on('click', function (e) {

            let lat = e.latlng.lat + 0.02
            let lng = e.latlng.lng

            const { Name } = e.target.feature.properties

            console.log(Name)

            if (Name === "Paso Canoas-Capacho") {
                let lat = e.latlng.lat - 0.003
                let CenterPopup = [lat, lng]
                map.setView(CenterPopup, 16)
                city.addTo(map)
            } else if (Name === "Tripartito") {
                let lat = e.latlng.lat
                let CenterPopup = [lat, lng]
                map.setView(CenterPopup, 17)
                city.addTo(map)
            } else if (Name === "Arauquita-La victoria") {
                let lat = e.latlng.lat
                let CenterPopup = [lat, lng]
                map.setView(CenterPopup, 14.5)
                city.addTo(map)
            }
            else if (Name === "Villa del rosario-San Antono de Tachira" || Name === "Acegua-Acegua"
                || Name == "Santa Elena" || Name === "Puerto Santander") {
                let lat = e.latlng.lat
                let CenterPopup = [lat, lng]
                map.setView(CenterPopup, 15.5)
                city.addTo(map)
            } else {
                let CenterPopup = [lat, lng]
                map.setView(CenterPopup, 13.5)
                city.addTo(map)

            }


        })
    },
}).addTo(map)

//Add event to remove the labels when the zoom is less than 10
map.on('zoomend', function (e) {
    let zoomlevel = map.getZoom();
    if (zoomlevel < 13) {
        map.removeLayer(city)
    } else {
        map.addLayer(city)
    }

})



/*----------Barra de busqueda---------------*/

const SearchCity = L.geoJson(cities, {
    pointToLayer: function (feature, latlng) {
        let lat = latlng.lat + 0.002
        let lng = latlng.lng - 0.003
        let position = [lat, lng]
        return L.marker(position, {
            icon: L.divIcon({
                iconSize: null,
                className: 'test'
            })
        })

    }
}
)


let searchControl = new L.Control.Search({
    layer: SearchCity,
    propertyName: 'Cities',
    circleLocation: true
});



map.addControl(searchControl);

//Añade slide menu


const right = '<br> <br> <h3>Lista de metrópolis binacionales en américa latina y el caribe</h3>';

let content = '';

for (let i = 0; i < ciudades.features.length; i++) {
    console.log(ciudades.features[i].properties)
    if (ciudades.features[i].properties.Anotación === null) {

        content += `<div class='list'> <strong> ${i + 1} ) </strong> <br> <strong> Ciudades que forman el aglomerado: </strong> ${ciudades.features[i].properties.Name} <br> <strong> Países del aglomerado:  </strong>${ciudades.features[i].properties.PAISES} <br><br> </div>`
    } else {
        content += `<div class='list'> <strong> ${i + 1} ) </strong> <br> <strong> Ciudades que forman el aglomerado: </strong> ${ciudades.features[i].properties.Name} <br> <strong> Países del aglomerado: </strong> ${ciudades.features[i].properties.PAISES} <br> <strong> Anotaciones: </strong> ${ciudades.features[i].properties.Anotación} <br> </div>`
    }
}






/* "<br>  <p> Esta página esta construida llamando los datos desde un geojson, debido a las limitaciones que se posee al no tener " +
    "un servidor que pueda estar conectado desplegando los datos de geoserver las 24 horas del día. Hay que " +
    "recordar que geoserver debe estar instalado y debe correr 24/7 en un servidor para poder ser accesible siempre. <br> <br> De igual manera construí una página que " +
    "llama las capas alojadas en geoserver como un servicio WMS, el cual se puede ver en este <a href= 'https://bsoviedoy.github.io/ICC-WMS/geovisor_WMS/index.html' alt='Enlace página geoserver'> enlace. </a>"; */
content += "<br> <h4>Metadatos </h4>"
content += "Epsg: 4326 <br>"
content += "Datum: Magna-Sirgas <br> "


const slide = L.control.slideMenu('', {
    position: 'topright', menuposition: 'topright',
    width: '30%', height: '400px', delay: '20', icon: 'fas fa-bars'
}).addTo(map);

slide.setContents(right + content);