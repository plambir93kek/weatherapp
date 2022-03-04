import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useApi } from '../hooks/useApi'
import { theme } from '../theme/theme'
import { Loader } from '../ui/Loader'
import { changeWeatherCondition } from '../utils/changeWeatherCondition'

interface MainProps {
  degreesType: string
}

export const Main: React.FC<MainProps> = ({ degreesType }) => {

  const { temp, weather, isLoading } = useApi()
  const [condition, setCondition] = useState('')
  const [conditionImg, setConditionImg] = useState(<Image source={require('../../assets/icons/storm.png')} />)

  const celsius = useMemo(() => {
    return (Number(temp) - 273.15).toFixed(0)
  }, [temp])

  const fahrenheit = useMemo(() => {
    return ((Number(temp) - 273.15) * 1.8 + 32).toFixed(0)
  }, [temp])

  useEffect(() => {
    if (weather) {
      const { image, condition } = changeWeatherCondition(weather)
      setCondition(condition)
      setConditionImg(image)
    }
  }, [weather])

  return (
    <>
      {isLoading ?
        <Loader />
        :
        <View style={styles.container}>
          <View style={styles.degrees}>
            {conditionImg}
            <Text style={styles.degreesText}>
              {degreesType === 'celsius' ? celsius : fahrenheit}
            </Text>
            <View style={styles.degreeSymbolContainer}>
              <Text style={styles.degreeSymbol}>о</Text>
            </View>
          </View>
          <Text style={styles.condition}>{condition}</Text>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  degrees: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  degreesText: {
    fontSize: 100,
    color: theme.colorPrimary,
    fontFamily: 'lt-light'
  },
  degreeSymbolContainer: {
    alignItems: 'flex-start',
    height: '100%',
    marginTop: 80,
    marginRight: 20
  },
  degreeSymbol: {
    color: theme.colorPrimary,
    fontSize: 50
  },
  condition: {
    fontSize: 25,
    color: theme.colorPrimary,
    fontFamily: 'lt-light'
  }
})