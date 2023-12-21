document.getElementById('locationButton').addEventListener('click', function() {
 
  document.getElementById('resultContainer').innerHTML = '';

 
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      
      var mapLink = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;

      
      var resultText = 'Ширина экрана: ' + screenWidth + 'px<br>Высота экрана: ' + screenHeight + 'px<br><br>Координаты местоположения:<br>Широта: ' + latitude + '<br>Долгота: ' + longitude;

      
      document.getElementById('resultContainer').innerHTML = resultText + '<br><br><a href="' + mapLink + '" target="_blank">Показать на карте</a>';
    }, function(error) {
      
      document.getElementById('resultContainer').innerHTML = 'Информация о местоположении недоступна';
    });
  } else {
    
    document.getElementById('resultContainer').innerHTML = 'Браузер не поддерживает функцию геолокации';
  }
});