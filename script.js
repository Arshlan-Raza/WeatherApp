const API_KEY = "03fe1538c61eb075c2b0eaa4404056ad";

async function showWeather(){
   const lat  = 15.3333;
   const lon = 74.0833;

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
    const data  = await response.json();

    let newPara  = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`

    document.body.appendChild(newPara);

}

showWeather();