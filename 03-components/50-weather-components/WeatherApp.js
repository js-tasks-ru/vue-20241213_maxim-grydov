import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import './WeatherApp.css'
import WeatherList from './WeatherList'


export default defineComponent({
  name: 'WeatherApp',


  components: {
    WeatherList,
  },


  setup() {
    /**
     * @param { number } temp
     * @return { string }
     */
    function tempKelvinToCelsius(temp) {
      return (temp - 273.15).toFixed(1)
    }


    /**
     *
     * @param { number } pressure
     * @return { number }
     */
    function pressureMPAToMM(pressure) {
      return Math.round(pressure * 0.75)
    }


    /**
     *
     * @param { object } placeCurrent
     * @param { string } placeCurrent.dt
     * @param { string } placeCurrent.sunrise
     * @param { string } placeCurrent.sunset
     * @return { boolean }
     */
    function isNight(placeCurrent) {
      let {
        dt,
        sunrise,
        sunset
      } = placeCurrent

      dt = parseFloat(dt.split(':').join('.'))
      sunrise = parseFloat(sunrise.split(':').join('.'))
      sunset = parseFloat(sunset.split(':').join('.'))

      return dt < sunrise || dt > sunset
    }


    const weatherData = getWeatherData()

    return {
      weatherData,
      WeatherConditionIcons,

      pressureMPAToMM,
      tempKelvinToCelsius,
      isNight,
    }
  },


  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      
      <WeatherList :weatherItems="weatherData"></WeatherList>

    </div>
  `,
})
