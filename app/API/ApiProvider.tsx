import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useFonts } from 'expo-font'
import { Alert } from 'react-native'

interface IContext {
  city: string
  myCity: string
  weather: string | null
  temp: number | null
  wind: number | null
  humidity: number | null
  pressure: number | null
  onChangeCity: Dispatch<SetStateAction<string>>
  isLoading: boolean
}

export const ApiContext = createContext<IContext>({} as IContext)

export const ApiProvider: React.FC = ({ children }) => {

  const [loaded] = useFonts({
    'lt-light': require('../../assets/fonts/Lato-Regular.ttf'),
    'lt-bold': require('../../assets/fonts/Lato-Bold.ttf')
  });

  const [city, setCity] = useState<string>('')
  const [myCity, setMyCity] = useState<string>('')
  const [weather, setWeather] = useState<string | null>(null)
  const [temp, setTemp] = useState<number | null>(null)
  const [wind, setWind] = useState<number | null>(null)
  const [humidity, setHumidity] = useState<number | null>(null)
  const [pressure, setPressure] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync(location.coords);
      setCity(address[0]?.city as string)
      setMyCity(address[0]?.city as string)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (city) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4683dcb503f6b8dbf0a385d65f8edecc`)
          const json = await response.json()
          setWeather(json.weather[0].main)
          setTemp(json.main.temp)
          setWind(json.wind.speed)
          setHumidity(json.main.humidity)
          setPressure(json.main.pressure)
        } catch (error) {
          console.log(error)
          Alert.alert('Ошибка получения данных', 'Вы ввели несуществующее название города', [{text: 'Ок'}])
          setCity(myCity)
        } finally {
          setIsLoading(false)
        }
      }
    })()
  }, [city])

  if (!loaded) {
    return null;
  }
  return (
    <ApiContext.Provider value={{ city, myCity, weather, temp, wind, humidity, pressure, onChangeCity: setCity, isLoading }}>
      {children}
    </ApiContext.Provider>
  )

}