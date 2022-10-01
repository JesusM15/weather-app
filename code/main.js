window.addEventListener('load', ()=>{
    let lon, lat;
    let APIKEY = 'db4a8920be1d7fd1361d2f4108c1bc9c';

    //elementos del DOM
    let valTemp = document.getElementById('val-temp');
    let imgWeather = document.getElementById('img');
    let stateTemp = document.getElementById('state');
    let location = document.getElementById('location');

    //obtener datos extra
    let humidity = document.getElementById('humidity'); 
    let pressure = document.getElementById('pressure');

    //api
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion=>{
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
            //peticion a la api
            fetch(url)
                .then( response =>{return response.json()})
                .then( data=>{
                    let temp = (Math.round(data.main.temp))-273;
                    console.log(data);
                    valTemp.textContent = `${temp}°c`;
                    imgWeather.src = `animated/${data.weather[0].main}.svg`;
                    stateTemp.textContent = `${data.weather[0].main}`;
                    location.textContent = `${data.sys.country}.`;

                    //pasar a datos extra
                    humidity.textContent = `${data.main.humidity}`;
                    pressure.textContent = `${data.main.pressure}`;
                });
        });
    }
});