import { Image } from 'react-native'

export const changeWeatherCondition = (weather: string) => {
  switch (weather) {
    case 'Thunderstorm':
      return {condition: 'Гроза', image: <Image source={require('../../assets/icons/storm.png')} />}
    case 'Drizzle':
      return {condition: 'Дождь', image: <Image source={require('../../assets/icons/rain.png')} />}
    case 'Rain':
      return {condition: 'Дождь', image: <Image source={require('../../assets/icons/rain.png')} />}
    case 'Snow':
      return {condition: 'Снег', image: <Image source={require('../../assets/icons/cloud.png')} />}
    case 'Clouds':
      return {condition: 'Облачно', image: <Image source={require('../../assets/icons/cloud.png')} />}
    case 'Haze':
      return {condition: 'Туман', image: <Image source={require('../../assets/icons/cloud.png')} />}
    case 'Fog':
      return {condition: 'Туман', image: <Image source={require('../../assets/icons/cloud.png')} />}
    case 'Mist':
      return {condition: 'Туман', image: <Image source={require('../../assets/icons/cloud.png')} />}
    case 'Clear':
      return {condition: 'Ясно', image: <Image source={require('../../assets/icons/sun.png')} />}
    default:
      return {condition: 'Переменная облачность', image: <Image source={require('../../assets/icons/partly.png')} />}
  }
}
 