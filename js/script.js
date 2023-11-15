const time = document.querySelector('.time'),
      calendar = document.querySelector('.date'),
      greetingText = document.querySelector('.greeting'),
      greetingContainer = document.querySelector('.greeting-container'),
      nameInput = document.querySelector('.name'),
      body = document.querySelector('.body'),
      next = document.querySelector('.slide-next'),
      prev = document.querySelector('.slide-prev')

const city = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const weatherDescription = document.querySelector('.weather-description');
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const quoteBtn = document.querySelector('.change-quote')
const playerContainer = document.querySelector('.player')
const errorblock = document.querySelector('.weather-error')

/*Audio*/
const playlistcontainer = document.querySelector('.play-list')
const playBtn = document.querySelector('.play')
const nextAudio = document.querySelector('.play-next')
const prevAudio = document.querySelector('.play-prev')
const audioTime = document.querySelector('.audio-time')
const progressBar = document.querySelector('.time-progress')
const progressBars = document.querySelectorAll('.progress-bar')
const volume = document.querySelector('.time-progress')
const muteBtn = document.querySelector('.audio-icon')
const currentAudio = document.querySelector('.current-audio')

const settings = document.querySelector('.settings')
const settingsBlock = document.querySelector('.settings-block')
const languageSelect = document.querySelector('.language-select')

/*Settings*/
const choiceInput = document.querySelectorAll('.choice-input')
const displayInput = document.querySelectorAll('.display-input')
const timeSet = document.querySelector('.Time')
const dateSet = document.querySelector('.Date')
const weatherSet = document.querySelector('.Weather')
const greetingSet = document.querySelector('.Greeting')
const playerSet = document.querySelector('.Player')
const quotesSet = document.querySelector('.Quote')
const displayText = document.querySelector('.display-text')
const bgText = document.querySelector('.setting-text')
const languageText = document.querySelector('.language-text')
const selectOpt1 = document.querySelector('.select-opt1')
const selectOpt2 = document.querySelector('.select-opt2')
const unsplashTags = document.querySelector('.unsplash-tags')
const flickTags = document.querySelector('.flick-tags')


let randomNum,
    randomQuoteNum,
    isPlay = false,
    playNum =0,
    api = 'GitHub',
    lang = 'en'

import playList from './playList.js'
import {toDo, doneBtn, clearBtn, toDoTitle, addList} from './to-do.js';
import {greetingTranslation, timeofDayTranslation, namePlaceHolderTranslation, weatherTranslation, settingsTranslation, toDoTranslation} from './translate.js';

function showTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    time.innerHTML = currentTime
    showDate(date)
    showGreeting(languageSelect.value)
    setTimeout(showTime, 1000)
}

showTime()
    
function showDate(date) {
    const options = {weekday: 'long',month: 'long', day: 'numeric'};
    calendar.innerHTML = date.toLocaleDateString(`${languageSelect.value}`,options)
}

function getTimeOfDay(lan) {
    const date = new Date()
    const TimeOfDay = ['night', 'morning', 'afternoon', 'evening']
    const Time = Math.floor(date.getHours()/6)
    return TimeOfDay[Time]
}

function showGreeting(lan) {
    let TimeOfDay = getTimeOfDay()
    greetingText.innerHTML = `${greetingTranslation[lan]} ${TimeOfDay},`
    if(lan === 'ru') {
        TimeOfDay = timeofDayTranslation[lan][getTimeOfDay()]
        greetingText.innerHTML = `${greetingTranslation[lan][TimeOfDay]} ${TimeOfDay},`
    }
}

function showPlaceHolderName(lan) {
    nameInput.placeholder = namePlaceHolderTranslation[lan]
}

showPlaceHolderName('en')

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value)
    localStorage.setItem('city', city.value)
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      nameInput.value = localStorage.getItem('name')
    }
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city')
    }
}

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20)
    return randomNum
}

getRandomNum()

function getBgAPI(e) {
    if(e.target.id === 'Unsplash') {
        flickTags.classList.remove('tags-active')
        unsplashTags.classList.add('tags-active')
        api = 'Unsplash'
        getLinkToImageUnsplash()
    }
    else if(e.target.id === 'Flick') {
        unsplashTags.classList.remove('tags-active')
        flickTags.classList.add('tags-active')
        api = 'Flick'
        getLinkToImageFlick()
    }
    else if(e.target.id === 'GitHub') {
        unsplashTags.classList.remove('tags-active')
        flickTags.classList.remove('tags-active')
        api ='GitHub'
        setBg()
    } 
}

flickTags.value = "nature"
unsplashTags.value = "nature"

function tagFlickSet() {
    return flickTags.value
}

function tagUnsplashSet() {
    return unsplashTags.value
}

flickTags.addEventListener('input', tagFlickSet)
unsplashTags.addEventListener('input', tagUnsplashSet)

async function getLinkToImageUnsplash() {
    const img = new Image()
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagUnsplashSet()}&client_id=Ml0A2_2_r5bcJVSgv6olV9KcXtTjRD6-HeeTStqtxQE`;
    const res = await fetch(url)
    const data = await res.json()
    img.src = data.urls.full
    img.onload = () => {
        body.style.backgroundImage = `url(${data.urls.full})`
    }
}

async function getLinkToImageFlick() {
    const img = new Image()
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f62ffe524819c98bc6bb89538efcf494&tags=${tagFlickSet()}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url)
    const data = await res.json()
    img.src = data.photos.photo[randomNum].url_l
    img.onload = () => {
        body.style.backgroundImage = `url(${data.photos.photo[randomNum].url_l})`
    }
}

function setBg() {
    const img = new Image()
    const bgNum = randomNum.toString().padStart(2, 0)
    const timeOfDay = getTimeOfDay()
    img.src = `https://raw.githubusercontent.com/HandleWith/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`
    } 
}

setBg()

function getSlideNext() {
    if(randomNum === 20) {
        randomNum = 1
    }
    else {
        randomNum ++
    }
    if(api === 'GitHub') {
        setBg()
    }
    else if(api === 'Flick') {
        getLinkToImageFlick()
    }
    else if(api === 'Unsplash') {
        getLinkToImageUnsplash()
    }
}

function getSlidePrev() {
    if(randomNum === 1) {
        randomNum = 20
    }
    else {
        randomNum --
    }
    if(api === 'GitHub') {
        setBg()
    }
    else if(api === 'Flick') {
        getLinkToImageFlick()
    }
    else if(api === 'Unsplash') {
        getLinkToImageUnsplash()
    }
}

function addDefaultCity(lan) {
    city.value = weatherTranslation.cityTranslation[lan]
}

addDefaultCity('en')

async function getWeather(lan) { 
    try {
        errorblock.innerHTML = ''
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lan}&appid=7692d8ccfdfd5981c698317092ebd439&units=metric`
        const res = await fetch(url)
        const data = await res.json()

        weatherIcon.className = 'weather-icon owf'
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.ceil(data.main.temp)}°C`
        wind.textContent = `${weatherTranslation.windTranslation[lan]} ${Math.ceil(data.wind.speed)} ${weatherTranslation.metricTranslation[lan]}`
        weatherDescription.textContent = data.weather[0].description
        humidity.textContent = `${weatherTranslation.humidityTranslation[lan]} ${data.main.humidity} %`
    } catch (error) {
        errorblock.textContent = `Error! City not found \'${city.value}\'`
        temperature.innerHTML = ''
        wind.innerHTML = ''
        weatherDescription.innerHTML = ''
        humidity.innerHTML = ''
    }
}

function setCity(event) {
    if (event.code === 'Enter') {
      getWeather(lang);
      city.blur();
      console.log()
    }
}

document.addEventListener('DOMContentLoaded', getWeather(lang));
city.addEventListener('keypress', setCity);
next.addEventListener('click', getSlideNext)
prev.addEventListener('click', getSlidePrev)
window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)
quoteBtn.addEventListener('click', getQuotes)

async function getQuotes(lan) {
    let quotes = `data_en.json`
    if(lan === 'ru') {
        quotes = `data_ru.json`
    }
    const res = await fetch(quotes)
    const data = await res.json()

    const randomNum = Math.floor(Math.random() * data.length)
    quote.textContent = data[randomNum].text
    author.textContent = data[randomNum].author
}

getQuotes()

function addLi() {
    for(let i=0; i<playList.length; i++) {
        playlistcontainer.innerHTML += `<li>${playList[i].title}</li>`
    }
    playlistcontainer.childNodes.forEach(el => el.classList.add('play-item'))
}

addLi()

const audio = new Audio();

function showCurrentAudio() {
    currentAudio.innerHTML = playList[playNum].title
}

function playAudio() {
  audio.src = playList[playNum].src
  showCurrentAudio()
  if(!isPlay) {
    audio.play()
    isPlay = true
    addActive()
  }
  else {
    audio.pause()
    audio.currentTime = 0
    isPlay = false
    playlistcontainer.childNodes.forEach(el => el.classList.remove('item-active'))
  }
}

function toggleBtn() {
    playBtn.classList.toggle('pause')
}

function playNext() {
    if(playNum === playList.length - 1) {
        playNum = -1
    }
    playNum++
    playAudio()
    audio.play()
    isPlay = true
    addActive()
    showCurrentAudio()
    playBtn.classList.add('pause')
    audio.currentTime = 0
}

function playPrev() {
    if(playNum === 0) {
        playNum = playList.length
    }
    playNum--
    playAudio()
    audio.play()
    isPlay = true
    addActive()
    showCurrentAudio()
    playBtn.classList.add('pause')
    audio.currentTime = 0
}

function addActive() {
    playlistcontainer.childNodes.forEach(el => el.classList.remove('item-active'))
    playlistcontainer.childNodes[playNum].classList.add('item-active')
}

function playCurrent(e) {
    playNum = [].slice.call(playlistcontainer.childNodes).indexOf(e.target)
    playBtn.classList.add('pause')
    playAudio()
}

playlistcontainer.childNodes.forEach(el => el.addEventListener('click', playCurrent))
playBtn.addEventListener('click', playAudio)
playBtn.addEventListener('click', toggleBtn)
nextAudio.addEventListener('click', playNext)
prevAudio.addEventListener('click', playPrev)
audio.addEventListener('ended', () => {
    playNext()
})

/*Audio*/

function getTimeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}

audioTime.innerHTML = `0:00/00:39`

function showAudioTime() {
    audioTime.innerHTML = `${getTimeFromNum(audio.currentTime)}/${playList[playNum].duration}`
}

function updateRange() {
    audio[this.name] = (this.value/100)
}

function handleProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100
    if(audio.paused) {
        progressBar.value = 0
        progressBar.style.background = `linear-gradient(to right, #7a7a7a 0%, #7a7a7a ${0}%, #fff ${0}%, white 100%)`
    }
}

function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * audio.duration
    audio.currentTime = scrubTime
}

function mute() {
    if(!audio.muted) {
        audio.muted = true
        this.classList.add('mute-icon')
    }
    else if(audio.muted) {
        audio.muted = false
        this.classList.remove('mute-icon')
    }
}

function updateColor() {
    const persent = (audio.currentTime / audio.duration) * 100
    progressBar.style.background = `linear-gradient(to right, #7a7a7a 0%, #7a7a7a ${persent}%, #fff ${persent}%, white 100%)`
}

function updateColor1() {
    const value = this.value
    this.style.background = `linear-gradient(to right, #7a7a7a 0%, #7a7a7a ${value}%, #fff ${value}%, white 100%)`
}

audio.addEventListener('timeupdate', showAudioTime)

progressBars.forEach(range => range.addEventListener('change', updateRange))
progressBars.forEach(range => range.addEventListener('mousemove', updateRange))
progressBars.forEach(range => range.addEventListener('input', updateColor1))

let mousedown = false
progressBar.addEventListener('click', scrub)
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e))
progressBar.addEventListener('mousedown', () => mousedown = true)
progressBar.addEventListener('mouseup', () => mousedown = false)

audio.addEventListener('timeupdate', handleProgress)
audio.addEventListener('timeupdate', updateColor)

volume.addEventListener('volumechange', updateColor1)
muteBtn.addEventListener('click', mute)

function showSettings() {
    settingsBlock.classList.toggle('settings-active')
}

function instSettingsValues(lan) {
    timeSet.innerHTML = settingsTranslation.timeTranslation[lan]
    dateSet.innerHTML = settingsTranslation.dateTranslation[lan]
    weatherSet.innerHTML = settingsTranslation.weathTranslation[lan]
    greetingSet.innerHTML = settingsTranslation.greetTranslation[lan]
    playerSet.innerHTML = settingsTranslation.playerTranslation[lan]
    quotesSet.innerHTML = settingsTranslation.quotesTranslatio[lan]
    displayText.innerHTML = settingsTranslation.displayTranslation[lan]
    bgText.innerHTML = settingsTranslation.backgroundImageTranslation[lan]
    languageText.innerHTML = settingsTranslation.languageTranslation[lan]
    selectOpt1.innerHTML = settingsTranslation.selectTranslation.opt1[lan]
    selectOpt2.innerHTML = settingsTranslation.selectTranslation.opt2[lan]
}

instSettingsValues('en')

function setTodoValues(lan) {
    toDoTitle.innerHTML = toDoTranslation.todotitleTranslation[lan]
    addList.placeholder = toDoTranslation.inputPlacehold[lan]
    clearBtn.innerHTML = toDoTranslation.clearBtnTranslation[lan]
    doneBtn.innerHTML = toDoTranslation.saveBtnTranslation[lan]
    toDo.innerHTML = toDoTranslation.todotranslation[lan]
}

setTodoValues('en')

function getLang(e) {
    if(this.value) {
        showPlaceHolderName(this.value)
        getWeather(this.value)
        addDefaultCity(this.value)
        getQuotes(this.value)
        instSettingsValues(this.value)
        setTodoValues(this.value)
        lang = this.value
    }
}

function fullOpacity(el) {
    el.style.opacity = '0'
}

function zeroOpacity(el) {
    el.style.opacity = '1'
}

function display(e) {
    if(!this.checked) {
        if(this.name === 'time') {
            fullOpacity(time)
        }
        else if(this.name === 'weather') {
            fullOpacity(weather)
        }
        else if(this.name === 'date') {
            fullOpacity(calendar)
        }
        else if(this.name === 'player') {
            fullOpacity(playerContainer)
        }
        else if(this.name === 'greeting-container') {
            fullOpacity(greetingContainer)
        }
        else if(this.name === 'quote') {
            fullOpacity(quote)
            fullOpacity(quoteBtn)
            fullOpacity(author)
        }
    }
    else {
        if(this.checked) {
            if(this.name === 'time') {
                zeroOpacity(time)
            }
            else if(this.name === 'weather') {
                zeroOpacity(weather)
            }
            else if(this.name === 'date') {
                zeroOpacity(calendar)
            }
            else if(this.name === 'player') {
                zeroOpacity(playerContainer)
            }
            else if(this.name === 'greeting-container') {
                zeroOpacity(greetingContainer)
            }
            else if(this.name === 'quote') {
                zeroOpacity(quote)
                zeroOpacity(quoteBtn)
                zeroOpacity(author)
            }
        }
    }    
}

displayInput.forEach(el => el.addEventListener('click', display))
choiceInput.forEach(el => el.addEventListener('click', getBgAPI))
choiceInput.forEach(el => el.addEventListener('change', getBgAPI))
settings.addEventListener('click', showSettings)
languageSelect.addEventListener('change', getLang)

