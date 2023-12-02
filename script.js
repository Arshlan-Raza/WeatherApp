const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


// Initial variable needed 

let currentTab = userTab ;
const API_key = "cc";
currentTab.classList.add("current-tab");
getFromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab !=currentTab){
         currentTab.classList.remove("current-tab");
         currentTab = clickedTab;
         currentTab.classList.add("current-tab");

         if(!searchForm.classList.contains('active')){
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add('active');
         }
         else{
            // main pehle search wale tab pr tha , ab your weather tab visible krna h
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');

            // ab main your weather tab me aa gya to ab, so displaying the your weather tab 
            getFromSessionStorage();
         }
    }
}

userTab.addEventListener('click',() =>{
    // pass clicked tab as input parameter 
    switchTab(userTab);
});

searchTab.addEventListener('click',() => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});

// checking if the coordinates are already present in session storage 
function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // if locaCoordinates are not present 
        grantAccessContainer.classList.add('active');

    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);   
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} =coordinates;

    // making the grant Access container visible 
    grantAccessContainer.classList.remove("active");

    // making the loader image visible 
    loadingScreen.classList.add('active');

    // calling the api which will fetch me the weather info 

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        // here we remove the loading screen as we got the coordinates 
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');

        // this function will fetch all the values we got after the api call and we will use the one which we need to show in our ui  
        renderWeatherInfo(data);
    }
    catch (err){

        handleError();
       
    }

}

// this function will remove all the displays from the web page
// function handleError() {
//     userInfoContainer.classList.remove("active");
//     loadingScreen.classList.remove("active");
//     errorContainer.classList.add("active");
// }

function  renderWeatherInfo(weatherInfo) {
    
    //  first we will fetch the  elements 
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // fetching the values from weatherInfo object and putting it in UI elements  
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`; 
    temp.innerText = weatherInfo?.main?.temp;
    windSpeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;

}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{

    }
}

function showPosition(){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,

    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click',getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    let  cityName = searchInput.value;

    if(cityName==""){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);
    }

})

async  function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active'); 
        renderWeatherInfo(data);
    }
    catch (err){

    }
}

 
