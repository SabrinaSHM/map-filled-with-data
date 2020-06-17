let jsonUrl = './meteo.json'

fetch(jsonUrl).then(response => {
  response.json().then(meteo => {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: -21.011478, lng: 55.272120}
    });
    
    meteo.meteo.bulletin.ville.forEach(ville => {
      console.log(ville)
      /**use of gouvrnment api so i could have enough information : lat and lng  */
      let url = 'https://api-adresse.data.gouv.fr/search/?q=' + ville['-id'] + '&type=municipality&limit=1'
    fetch(url).then(response => {
      response.json().then(city => {
        let [lng, lat] = city.features[0].geometry.coordinates
        console.log(lat, lng)
        
        new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
          title: ville['-id'] + ' : ' + ville['-temperature_mini'] + '°C'
        });
      })
   })
    })
  })
})