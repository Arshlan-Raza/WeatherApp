const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


// Initial variable needed 

let currentTab = userTab ;
const API_key = "03fe1538c61eb075c2b0eaa4404056ad";
currentTab.classList.add("current-tab");

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
            userInfoContainerContainer.classList.remove('active');

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

    }
    catch (err){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        // here we remove the loading screen as we got the coordinates 
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');

        // this function will fetch all the values we got after the api call and we will use the one which we need to show in our ui  
        renderWeatherInfo(data);
    }

}