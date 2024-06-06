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
const sunriseBox = document.getElementById('sunrise')
const sunsetBox = document.getElementById('sunset')


//  air quality info
const quality = document.getElementById('air-quality-info')
const airIndex = document.getElementById('air-quality-index')
const pm2Info = document.getElementById('pm2-info')
const pm10Info = document.getElementById('pm10-info')
const so2Info = document.getElementById('so-info')
const no2Info = document.getElementById('no-info')
const ozoneInfo = document.getElementById('ozone-info')
const coInfo = document.getElementById('co-info')

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


const root = document.documentElement


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
    getAirQuality(latitude,longitude)
}

// definindo clima atual
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
    let sunriseChart = ((sunriseHour*60)+sunriseMin)/100
    sunriseBox.innerText = `${sunriseHour}:${sunriseMin}`
    // root.style.setProperty('--start', sunriseChart)

    // definindo sunset
    let sunsetTime = new Date(sunsetUnix*1000)
    let sunsetHour = sunsetTime.getHours()
    let sunsetMin = sunsetTime.getMinutes()
    let sunsetChart = ((sunsetHour*60)+sunsetMin)/100
    sunsetBox.innerText = `${sunsetHour}:${sunsetMin}`
    // root.style.setProperty('--end', sunsetChart)
}
 
// definindo clima da semana
async function getWeekWeather(latitude,longitude){
    let weekWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br&cnt=5`

    resposta = await fetch(weekWeatherUrl)
    const weekWeather = await resposta.json()

    setWeekWeather(weekWeather)
} 

function setWeekWeather(weekWeather){
    todayWeather.setAttribute('src', `https://openweathermap.org/img/wn/${weekWeather.list[0].weather[0].icon}.png`)
    todayWeather.setAttribute('title', `${weekWeather.list[0].weather[0].description}`)

    d2Weather.setAttribute('src', `https://openweathermap.org/img/wn/${weekWeather.list[1].weather[0].icon}.png`)
    d2Weather.setAttribute('title', `${weekWeather.list[1].weather[0].description}`)

    d3Weather.setAttribute('src', `https://openweathermap.org/img/wn/${weekWeather.list[2].weather[0].icon}.png`)
    d3Weather.setAttribute('title', `${weekWeather.list[2].weather[0].description}`)

    d4Weather.setAttribute('src', ` https://openweathermap.org/img/wn/${weekWeather.list[3].weather[0].icon}.png`)
    d4Weather.setAttribute('title', `${weekWeather.list[3].weather[0].description}`)

    d5Weather.setAttribute('src', ` https://openweathermap.org/img/wn/${weekWeather.list[4].weather[0].icon}.png`)
    d5Weather.setAttribute('title', `${weekWeather.list[4].weather[0].description}`)

    day2Max.innerText = weekWeather.list[1].main.temp_max.toFixed(1)
    day2Min.innerText = weekWeather.list[1].main.temp_min.toFixed(1)
    day3Max.innerText = weekWeather.list[2].main.temp_max.toFixed(1)
    day3Min.innerText = weekWeather.list[2].main.temp_min.toFixed(1)
    day4Max.innerText = weekWeather.list[3].main.temp_max.toFixed(1)
    day4Min.innerText = weekWeather.list[3].main.temp_max.toFixed(1)
    day5Max.innerText = weekWeather.list[4].main.temp_max.toFixed(1)
    day5Min.innerText = weekWeather.list[4].main.temp_max.toFixed(1)

    const today = new Date()
    const day = today.getDay()
    switch(day){
        case 1:
            document.getElementById('day3-title').innerText = 'Quarta'
            document.getElementById('day4-title').innerText = 'Quinta'
            document.getElementById('day5-title').innerText = 'Sexta'
        break;
        case 2:
            document.getElementById('day3-title').innerText = 'Quinta'
            document.getElementById('day4-title').innerText = 'Sexta'
            document.getElementById('day5-title').innerText = 'Sábado'
        break;
        case 3:
            document.getElementById('day3-title').innerText = 'Sexta'
            document.getElementById('day4-title').innerText = 'Sábado'
            document.getElementById('day5-title').innerText = 'Domingo'
        break;
        case 4:
            document.getElementById('day3-title').innerText = 'Sábado'
            document.getElementById('day4-title').innerText = 'Domingo'
            document.getElementById('day5-title').innerText = 'Segunda'
        break;
        case 5:
            document.getElementById('day3-title').innerText = 'Domingo'
            document.getElementById('day4-title').innerText = 'Segunda'
            document.getElementById('day5-title').innerText = 'Terça'
        break;
        case 6:
            document.getElementById('day3-title').innerText = 'Segunda'
            document.getElementById('day4-title').innerText = 'Terça'
            document.getElementById('day5-title').innerText = 'Quarta'
        break;
        case 7:
            document.getElementById('day3-title').innerText = 'Terça'
            document.getElementById('day4-title').innerText = 'Quarta'
            document.getElementById('day5-title').innerText = 'Quinta'
        break;
    }
}

// definindo qualidade do ar
async function getAirQuality(latitude,longitude){
    let airUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

    response = await fetch(airUrl)
    const airQuality = await response.json()

    setAirQualityIndex(airQuality)
}

function setAirQualityIndex(airQuality){
    let index = airQuality.list[0].main.aqi
    airIndex.innerText = index

    switch(index){
        case 1:
            quality.innerText = 'Ótima'
            quality.style.color = '#87EBCD'
        break;
        case 2:
            quality.innerText = 'Boa'
            quality.style.color = '#c0eb87'
        break;
        case 3:
            quality.innerText = 'Moderado'
            quality.style.color = 'yellow'
        break;
        case 4:
            quality.innerText = "Ruim"
            quality.style.color = 'orange'
        break;
        case 5:
            quality.innerText = 'Péssima'
            quality.style.color = 'red'
        break;
    }

    // definindo pm2.5
    let pm2 = airQuality.list[0].components.pm2_5
    pm2Info.innerText = pm2.toFixed(1)
    if(pm2 >= 0 && pm2 < 10){
        pm2Info.style.color = '#87EBCD'
    } else if(pm2 > 10 && pm2 < 25){
        pm2Info.style.color = '#c0eb87'
    } else if(pm2 > 25 && pm2 < 50){
        pm2Info.style.color = 'yellow'
    } else if(pm2 > 50 && pm2 < 75){
        pm2Info.style.color = 'orange'
    } else if(pm2 >= 75){
        pm2Info.style.color = 'red'
    }

    // definindo pm10
    let pm10 = airQuality.list[0].components.pm10
    pm10Info.innerText = pm10.toFixed(1)
    if(pm10 >= 0 && pm2 < 10){
        pm10Info.style.color = '#87EBCD'
    } else if(pm10 > 10 && pm10 < 25){
        pm10Info.style.color = '#c0eb87'
    } else if(pm10 > 25 && pm10 < 50){
        pm10Info.style.color = 'yellow'
    } else if(pm10 > 50 && pm10 < 75){
        pm10Info.style.color = 'orange'
    } else if(pm10 >= 75){
        pm10Info.style.color = 'red'
    }

    // definindo so2
    let so2 = airQuality.list[0].components.so2
    so2Info.innerText = so2.toFixed(1)
    if(so2 >= 0 && so2 < 20){
        so2Info.style.color = '#87EBCD'
    } else if(so2 > 20 && so2 < 80){
        so2Info.style.color = '#c0eb87'
    } else if(so2 > 80 && so2 < 250){
        so2Info.style.color = 'yellow'
    } else if(so2 > 250 && so2 < 350){
        so2Info.style.color = 'orange'
    } else if(so2 >= 350){
        so2Info.style.color = 'red'
    }

    // definindo no2
    let no2 = airQuality.list[0].components.no2
    no2Info.innerText = no2.toFixed(1)
    if(no2 >= 0 && no2 < 20){
        no2Info.style.color = '#87EBCD'
    } else if(no2 > 20 && no2 < 80){
        no2Info.style.color = '#c0eb87'
    } else if(no2 > 80 && no2 < 250){
        no2Info.style.color = 'yellow'
    } else if(no2 > 250 && no2 < 350){
        no2Info.style.color = 'orange'
    } else if(no2 >= 350){
        no2Info.style.color = 'red'
    }
    
    // definindo o3
    let o3 = airQuality.list[0].components.o3
    ozoneInfo.innerText = o3.toFixed(1)
    if(o3 >= 0 && o3 < 60){
        ozoneInfo.style.color = '#87EBCD'
    } else if(o3 > 60 && o3 < 100){
        ozoneInfo.style.color = '#c0eb87'
    } else if(o3 > 100 && o3 < 140){
        ozoneInfo.style.color = 'yellow'
    } else if(o3 > 140 && o3 < 180){
        ozoneInfo.style.color = 'orange'
    } else if(o3 >= 180){
        ozoneInfo.style.color = 'red'
    }

    
    // definindo CO
    let co = airQuality.list[0].components.co
    coInfo.innerText = co.toFixed(1)
    if(co >= 0 && co < 4400){
        so2Info.style.color = '#87EBCD'
    } else if(co > 4400 && co < 9400){
        so2Info.style.color = '#c0eb87'
    } else if(co > 9400 && co < 12400){
        so2Info.style.color = 'yellow'
    } else if(co > 12400 && co < 15400){
        so2Info.style.color = 'orange'
    } else if(co >= 15400){
        so2Info.style.color = 'red'
    }
}

// definindo horario do sol// Sun time info
setInterval(() => {
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    const time = ((hour*60)+min)/100
    
    document.getElementById('time-now').innerHTML = `${hour}:${min}`

    // root.style.setProperty('--pos-x', time)    
},1000)