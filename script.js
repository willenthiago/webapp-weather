// api key
const apiKey = '00a0fcf0a964808654932bc322ab064d'

// Current weather info
const getLocation = document.getElementById('city');
const getCurrentTemp = document.getElementById('temp-live')
const getMinTemp = document.getElementById('min-temp')
const getMaxTemp = document.getElementById('max-temp')
const windSpeed = document.getElementById('wind-speed')
const humidity = document.getElementById('humidity')
const rainProb = document.getElementById('rain-prob')
let latitude = -15.7934036
let longitude = -47.8823172

// Sun time info
const timeNow = document.getElementById('time-now')
const sunriseBox = document.getElementById('sunrise')
const sunsetBox = document.getElementById('sunset')

const date = new Date()
const day = date.getDay()
const hour = date.getHours()
const min = date.getMinutes()

timeNow.innerHTML = `${hour}:${min}`

//  qualidade do ar
const quality = document.getElementById('air-quality-info')
const airIndex = document.getElementById('air-quality-index')
const pm2 = document.getElementById('pm2')
const pm2Info = document.getElementById('pm2-info')
const pm10 = document.getElementById('pm10')
const pm10Info = document.getElementById('pm10-info')
const so2 = document.getElementById('dioxide-sulfo')
const so2Info = document.getElementById('so-info')
const no2 = document.getElementById('dioxide-nitro')
const no2Info = document.getElementById('no-info')
const ozone = document.getElementById('ozone')
const ozoneInfo = document.getElementById('ozone-info')

//  week-weather info

const todayWeather = document.getElementById('today-weather-icon')
const d2Weather = document.getElementById('day2-weather-icon')
const d3Weather = document.getElementById('day3-weather-icon')
const d4Weather = document.getElementById('day4-weather-icon')
const d5Weather = document.getElementById('day5-weather-icon')
const todayMax = document.getElementById('week-today-max')
const todayMin = document.getElementById('week-today-min')
const day2Max = document.getElementById('day2-max')
const day2Min = document.getElementById('day2-min')
const day3Max = document.getElementById('day3-max')
const day3Min = document.getElementById('day3-min')
const day4Max = document.getElementById('day4-max')
const day4Min = document.getElementById('day4-min')
const day5Max = document.getElementById('day5-max')
const day5Min = document.getElementById('day5-min')

//  set week days

const day3 = document.getElementById('day3-title')
const day4 = document.getElementById('day4-title')
const day5 = document.getElementById('day5-title')

switch(day){
    case 1:
        day3.innerText = 'Quarta'
        day4.innerText = 'Quinta'
        day5.innerText = 'Sexta'
    break;
    case 2:
        day3.innerText = 'Quinta'
        day4.innerText = 'Sexta'
        day5.innerText = 'Sábado'
    break;
    case 3:
        day3.innerText = 'Sexta'
        day4.innerText = 'Sábado'
        day5.innerText = 'Domingo'
    break;
    case 4:
        day3.innerText = 'Sábado'
        day4.innerText = 'Domingo'
        day5.innerText = 'Segunda'
    break;
    case 5:
        day3.innerText = 'Domingo'
        day4.innerText = 'Segunda'
        day5.innerText = 'Terça'
    break;
    case 6:
        day3.innerText = 'Segunda'
        day4.innerText = 'Terça'
        day5.innerText = 'Quarta'
    break;
    case 7:
        day3.innerText = 'Terça'
        day4.innerText = 'Quarta'
        day5.innerText = 'Quinta'
    break;
}

// definindo localização

getLocation.addEventListener('click', () => {
    let city = ''
    do{
       city = prompt('Digite a sua cidade: ')
    }while(city == '')

    getCoord(city)
})

async function getCoord(city){
    let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`

    const response = await fetch(geoUrl)
    const geoLocation = await response.json()
    latitude = geoLocation[0].lat
    longitude = geoLocation[0].lon

    getLocation.innerText = geoLocation[0].name

    getCurrentWeather(latitude,longitude)
    getWeekWeather(latitude,longitude)
}

async function getCurrentWeather(latitude,longitude){
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`

    resp = await fetch(currentWeatherUrl)
    const currentWeather = await resp.json()

    setCurrentWeather(currentWeather)
}

function setCurrentWeather(currentWeather){
    getCurrentTemp.innerText = currentWeather.main.temp.toFixed(1)
    getMaxTemp.innerText = currentWeather.main.temp_max.toFixed(1)
    getMinTemp.innerText = currentWeather.main.temp_min.toFixed(1)
    windSpeed.innerText = (currentWeather.wind.speed*3.6).toFixed(1)
    todayMax.innerText = currentWeather.main.temp_max.toFixed(1)
    todayMin.innerText = currentWeather.main.temp_min.toFixed(1)
    humidity.innerHTML = currentWeather.main.humidity

    let sunriseUnix = currentWeather.sys.sunrise
    let sunsetUnix = currentWeather.sys.sunset

    // definindo sunrise
    let sunriseTime = new Date(sunriseUnix*1000)
    let sunriseHour = sunriseTime.getHours()
    let sunriseMin = sunriseTime.getMinutes()
    sunriseBox.innerText = `${sunriseHour}:${sunriseMin}`

    // definindo sunset
    let sunsetTime = new Date(sunsetUnix*1000)
    let sunsetHour = sunsetTime.getHours()
    let sunsetMin = sunsetTime.getMinutes()
    sunsetBox.innerText = `${sunsetHour}:${sunsetMin}`
}
 
async function getWeekWeather(latitude,longitude){
    let weekWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br&cnt=5`

    resposta = await fetch(weekWeatherUrl)
    const weekWeather = await resposta.json()

    setWeekWeather(weekWeather)
} 

function setWeekWeather(weekWeather){
    todayWeather.setAttribute('src', `https://openweathermap.org/img/wn/${weekWeather.list[0].weather[0].icon}.png`)

    d2Weather.setAttribute('src', `https://openweathermap.org/img/wn/${weekWeather.list[1].weather[0].icon}.png`)

    d3Weather.setAttribute('src', `https://openweathermap.org/img/wn/${weekWeather.list[2].weather[0].icon}.png`)

    d4Weather.setAttribute('src', ` https://openweathermap.org/img/wn/${weekWeather.list[3].weather[0].icon}.png`)

    d5Weather.setAttribute('src', ` https://openweathermap.org/img/wn/${weekWeather.list[4].weather[0].icon}.png`)

    day2Max.innerText = weekWeather.list[1].main.temp_max.toFixed(1)
    day2Min.innerText = weekWeather.list[1].main.temp_min.toFixed(1)
    day3Max.innerText = weekWeather.list[2].main.temp_max.toFixed(1)
    day3Min.innerText = weekWeather.list[2].main.temp_min.toFixed(1)
    day4Max.innerText = weekWeather.list[3].main.temp_max.toFixed(1)
    day4Min.innerText = weekWeather.list[3].main.temp_max.toFixed(1)
    day5Max.innerText = weekWeather.list[4].main.temp_max.toFixed(1)
    day5Min.innerText = weekWeather.list[4].main.temp_max.toFixed(1)
}