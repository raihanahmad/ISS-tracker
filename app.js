// declaring dom varible
let latitude = document.querySelector("#lat");
let longitude = document.querySelector("#lon");
let altitude = document.querySelector("#alt");

// calling api request
fetch(
  "https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/1/&apiKey=B5TK9V-KXSGG6-JUXT3N-497X#"
)
  .then((res) => res.json())
  .then((data) => data.positions[0])
  .then((data) => {
    let x = data.satlatitude;
    let y = data.satlongitude;
    let z = data.sataltitude;

    // changing dom latitude & longitude value
    latitude.innerHTML = `Latitude: ${x.toFixed(6)}`;
    longitude.innerHTML = `Longitude: ${y.toFixed(6)}`;
    altitude.innerHTML = `Altitude: ${z.toFixed(2)} KM`;
    document.querySelector("#map-loding").remove();

    // making map
    let baseMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM(),
    });
    let map = new ol.Map({
      target: "map",
      layers: [baseMapLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([y, x]),
        zoom: 4, //Initial Zoom Level
      }),
    });
    // making map marker
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([y, x])), // Cordinates of ISS
    });

    marker.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          color: "rgba(255,255,255,0)",
          crossOrigin: "",
          src: "iss-new.png",
        }),
      })
    );

    let vectorSource = new ol.source.Vector({
      features: [marker],
    });
    let markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    map.addLayer(markerVectorLayer);
  });
