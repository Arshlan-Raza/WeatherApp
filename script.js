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