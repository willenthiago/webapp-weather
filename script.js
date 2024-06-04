// Current weather info
const getLocation = document.getElementById('city');
const getCurrentTemp = document.getElementById('temp-live')
const getMinTemp = document.getElementById('min-temp')
const getMaxTemp = document.getElementById('max-temp')
const windSpeed = document.getElementById('wind-speed')
const humidity = document.getElementById('humidity')
const rainProb = document.getElementById('rain-prob')

// Sun time info
const timeNow = document.getElementById('time-now')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

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

getLocation.addEventListener('click', () => {
    let city = prompt('Digite a sua cidade: ')
})