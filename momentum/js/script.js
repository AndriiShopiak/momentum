let playButton = document.querySelector(".player__buttons__button .play_button");
let nextButton = document.querySelector(".next_button");
let prewButton = document.querySelector(".prew_button");
let listIcons = document.querySelectorAll(".player__list__item img");
let audio = [new Audio("../momentum/assets/sounds/Aqua_Caelestis.mp3"),
    new Audio("../momentum/assets/sounds/River Flows In You.mp3"),
    new Audio("../momentum/assets/sounds/1+1_sound.mp3"),
    new Audio("../momentum/assets/sounds/Ennio Morricone.mp3")
];
// Next button
let index = 0;
function nextSong() {
    playButton.classList.add('play')
    playButton.src = 'assets/svg/pause.svg';
    listIcons[index].src = 'assets/svg/play.svg';
    songsItemName[index].style.color = "white";
    audio[index].pause();
    audio[index].currentTime = 0;
    if (index > 2) {
        index = 0;
    } else {
        index++;
    }
    audio[index].play();
    songsItemName[index].style.color = "yellow";
    listIcons[index].src = 'assets/svg/pause.svg';
    audio[index].addEventListener('timeupdate', updateProgress);
    audio[index].addEventListener('ended', nextSong);
    songsHeader.innerHTML = `${NameSong[index]}`;
}
nextButton.addEventListener('click' , nextSong);
// var for songs list
let songsItemName = document.querySelectorAll(".song_name");
let songsHeader = document.querySelector(".song_title_header");
let NameSong = ["Aqua Caelestis","River Flows","Una Mattina","Ennio"]
// Play and Pause 
function PlayPouse () {
    let isClass = playButton.classList.toggle('play')
    if (isClass) {
        playButton.src = 'assets/svg/pause.svg';
        listIcons[index].src = 'assets/svg/pause.svg';
        audio[index].play();
    }
    else {
        playButton.src = 'assets/svg/play.svg';
        listIcons[index].src = 'assets/svg/play.svg';
        audio[index].pause();
    }
    songsItemName[index].style.color = "yellow";
    songsHeader.innerHTML = `${NameSong[index]}`;

}
playButton.addEventListener('click', PlayPouse);

// Prew button
    prewButton.addEventListener('click' , () => {
        playButton.classList.add('play');
        songsItemName[index].style.color = "white";
        listIcons[index].src = 'assets/svg/play.svg';
        audio[index].pause();
        audio[index].currentTime = 0;
        playButton.src = 'assets/svg/pause.svg';
        if (index <= 0) {
            index = 3;
        } else {
            index--;
        }
        audio[index].play();
        audio[index].addEventListener('timeupdate', updateProgress);
        songsItemName[index].style.color = "yellow";
        listIcons[index].src = 'assets/svg/pause.svg';
        songsHeader.innerHTML = `${NameSong[index]}`;
});

//Progress bar
let progress = document.querySelector(".progress_block_progress");
let curTime = document.querySelector(".progress__time .current__time");
let dur = document.querySelector(".duration__time");
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    let durmin = Math.floor(audio[index].duration / 60);
    let dursec = Math.floor(audio[index].duration - durmin * 60);
    let curmin = Math.floor(audio[index].currentTime  / 60);
    let cursec = Math.floor(audio[index].currentTime - curmin  * 60);
    if (durmin < 10) durmin = "0" + durmin;
    if (dursec < 10) dursec = "0" + dursec;
    if (curmin < 10) curmin = "0" + curmin;
    if (cursec < 10) cursec = "0" + cursec;
    let duration1 = durmin + ":" + dursec;
    let currentTime1 = curmin + ":" + cursec;
    curTime.innerHTML = `${currentTime1}`;
    dur.innerHTML = `${duration1}`;
}
audio[index].addEventListener('timeupdate', updateProgress);

// Set Progress 
let progressCon = document.querySelector(".progress_block");
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio[index].duration;
    audio[index].currentTime = (clickX / width) * duration;
}
progressCon.addEventListener('click',setProgress);
// Auto song next
audio[index].addEventListener('ended', nextSong);

// Volume level 
let valueOfVolume = document.querySelector(".volume__level");
valueOfVolume.addEventListener('input', () => {
    audio[index].volume = valueOfVolume.value / 100;
});
// off volume
let volumeSvg = document.querySelector(".player_volume .volume_svg");
volumeSvg.addEventListener('click', () => {
    let isActive = volumeSvg.classList.toggle("act");
    if (isActive) {
        volumeSvg.src = 'assets/svg/volume_unactive.svg';
        audio[index].volume = 0; 
    } else {
        volumeSvg.src = 'assets/svg/volume1.svg';
        audio[index].volume = valueOfVolume.value / 100;
    }
});
// Playlist Play 
listIcons[0].addEventListener('click', () => {
    audio[index].pause();
    listIcons[index].src = 'assets/svg/play.svg';
    songsItemName[index].style.color = "white";
    index = 0;
    audio[index].play();
    PlayPouse();
    songsItemName[index].style.color = "yellow";
    listIcons[index].src = 'assets/svg/pause.svg';
    audio[index].addEventListener('timeupdate', updateProgress);
});
listIcons[1].addEventListener('click', () => {
    audio[index].pause();
    listIcons[index].src = 'assets/svg/play.svg';
    songsItemName[index].style.color = "white";
    index = 1;
    audio[index].play();
    PlayPouse();
    songsItemName[index].style.color = "yellow";
    listIcons[index].src = 'assets/svg/pause.svg';
    audio[index].addEventListener('timeupdate', updateProgress);
    audio[index].addEventListener('ended', nextSong);
});
listIcons[2].addEventListener('click', () => {
    audio[index].pause();
    listIcons[index].src = 'assets/svg/play.svg';
    songsItemName[index].style.color = "white";
    index = 2;
    audio[index].play();
    PlayPouse();
    songsItemName[index].style.color = "yellow";
    listIcons[index].src = 'assets/svg/pause.svg';
    audio[index].addEventListener('timeupdate', updateProgress);
    audio[index].addEventListener('ended', nextSong);
});
listIcons[3].addEventListener('click', () => {
    audio[index].pause();
    listIcons[index].src = 'assets/svg/play.svg';
    songsItemName[index].style.color = "white";
    index = 3;
    audio[index].play();
    PlayPouse();
    songsItemName[index].style.color = "yellow";
    listIcons[index].src = 'assets/svg/pause.svg';
    audio[index].addEventListener('timeupdate', updateProgress);
    audio[index].addEventListener('ended', nextSong);
});
// Weather get 
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatheInput = document.querySelector('.weather__input');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
if (localStorage.city == undefined){
    weatheInput.value = "Minsk";
    getWeather();
}
else {
    weatheInput.value = localStorage.city;
    getWeather();
}

async function getWeather() {
    localStorage.setItem('city', weatheInput.value);
    weatheInput.value =  localStorage.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.city}&lang=en&appid=5f03d7711f763e83f987a3b7323e8ea2&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == '404') {
        temperature.textContent = "";
        weatherDescription.textContent = "";
        wind.textContent = "";
        humidity.innerHTML = `${data.message}`;
    }
    else {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind: ${Math.floor(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
    }
  }
  weatheInput.addEventListener('change', () => {
    localStorage.setItem("city", weatheInput.value);
    getWeather();
  });
//   Time
let dayDate = document.querySelector(".date"); 
let time = document.querySelector(".time");
function showTime () {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    time.textContent = `${currentTime}`;
    showDate();
}
showTime();
// Get Date
function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-US', options);
    dayDate.textContent = `${currentDate}`;
}
// Greeting 
let greetInput = document.querySelector(".greeting__text");
function greeting () {
    let nameOfDay = ['morning','afternoon','evening','night'];
    const date = new Date();
    let curHour = date.getHours();
    if (curHour > 5 && curHour <= 12) return `${nameOfDay[0]}`;
    if (curHour > 12 && curHour < 18) return `${nameOfDay[1]}`;
    if (curHour >= 18 && curHour <=23) return `${nameOfDay[2]}`;
    else return `${nameOfDay[3]},`;
}
greetInput.textContent = `Good ${greeting()},`;
// Get name in local
let nameInputPer = document.querySelector(".input_name_greeting");
nameInputPer.value = localStorage.name;
if(localStorage.name == undefined) {
    nameInputPer.value = "";
}
nameInputPer.addEventListener("change", () => {
    localStorage.setItem('name', nameInputPer.value);
});
// Add image for BG
let arrowsBG = document.querySelectorAll(".list_bg_buttons svg");
let BackBody = document.querySelector("body");
let numberOfImage = 1 + Math.floor(Math.random() *(20 - 1 + 1));

BackBody.style.backgroundImage = `url(assets/img/${greeting()}/${numberOfImage}.webp)`;
arrowsBG[0].addEventListener('click', () => {
    if (numberOfImage == 1) {
        numberOfImage = 20;
    } else {
        numberOfImage --;
    }
    BackBody.style.backgroundImage = `url(assets/img/${greeting()}/${numberOfImage}.webp)`;
});
arrowsBG[1].addEventListener('click', () => {
    if (numberOfImage == 20) {
        numberOfImage = 1;
    } else {
        numberOfImage ++;
    }
    BackBody.style.backgroundImage = `url(assets/img/${greeting()}/${numberOfImage}.webp)`;
});
// Quotes
let quotesContent = document.querySelector(".quotes_text");
let quotesAuthor = document.querySelector(".quotes_author");
let refreshIcon = document.querySelector(".refreshIcon");

async function getQuotes() {  
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let indexOfquote = 1 + Math.floor(Math.random() *(101 - 1 + 1)); 
    quotesContent.textContent = `${data.quotes[indexOfquote].quote}`;
    quotesAuthor.textContent = `${data.quotes[indexOfquote].author}`;
  }
  getQuotes();
  refreshIcon.addEventListener('click', getQuotes);

// Set Language
let settingsIcon = document.querySelector(".settings_icon");
let languageItem = document.querySelector(".language");
languageItem.style.display = "none";

settingsIcon.addEventListener('click', () => {
    if (languageItem.style.display == "none") {
        languageItem.style.display = "block";
    } else {
        languageItem.style.display = "none";
    }
});
 

  
