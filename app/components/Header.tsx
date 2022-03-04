import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, StyleSheet, Text, Pressable, Image, TextInput } from 'react-native'
import { useApi } from '../hooks/useApi'
import { theme } from '../theme/theme'

interface HeaderProps {
  degreesType: string
  onChangeDegreesType: Dispatch<SetStateAction<string>>
}

export const Header: React.FC<HeaderProps> = ({ degreesType, onChangeDegreesType }) => {

  const { city, myCity, onChangeCity } = useApi()
  const [showInput, setShowInput] = useState(false)
  const [cityInput, setCityInput] = useState<string>('')

  const handleChange = () => {
    setShowInput(false)
    if (cityInput) {
      onChangeCity(cityInput)
    }
  }

  return (
    <>
      {showInput ?
        <View style={styles.inputContainer}>
          <View style={styles.wrapper}>
            <TextInput onChangeText={text => setCityInput(text)} style={styles.input} />
            <Pressable onPress={handleChange}>
              <Text style={styles.button}>OK</Text>
            </Pressable>
          </View>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.cityContainer}>
            <Text style={[styles.city, city.length > 12 ? { fontSize: 20 } : { fontSize: 30 }]}>{city}</Text>
            <View style={styles.degreesContainer}>
              <Image style={styles.degreeImage} source={require('../../assets/icons/degree.png')} />
              <View style={styles.degrees}>
                <Pressable
                  style={degreesType === 'celsius' && { backgroundColor: theme.colorSecond }}
                  onPress={() => onChangeDegreesType('celsius')}
                >
                  <Text style={[
                    styles.degreesOption,
                    degreesType === 'celsius' && { color: theme.colorPrimary }
                  ]}>C</Text>
                </Pressable>
                <Pressable
                  style={degreesType === 'fahrenheit' && { backgroundColor: theme.colorSecond }}
                  onPress={() => onChangeDegreesType('fahrenheit')}
                >
                  <Text style={[
                    styles.degreesOption,
                    degreesType === 'fahrenheit' && { color: theme.colorPrimary }
                  ]}>F</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <Pressable
              onPress={() => setShowInput(true)}
            >
              {({ pressed }) => <Text
                style={[styles.secondaryText, { opacity: pressed ? 0.6 : 1 }]}>
                Сменить город
              </Text>}
            </Pressable>
            <Pressable onPress={() => onChangeCity(myCity)}>
              {({ pressed }) => <View style={styles.location}>
                <Image style={styles.locationImage} source={require('../../assets/icons/location.png')} />
                <Text
                  style={[styles.secondaryText, { opacity: pressed ? 0.6 : 1 }]}>
                  Мое местоположение
                </Text>
              </View>}
            </Pressable>
          </View>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 78,
    marginTop: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17,
    backgroundColor: theme.colorPrimary,
    width: '90%',
    height: 53,
    borderRadius: 4,
  },
  input: {
    width: '80%',
    height: 20,
  },
  button: {
    marginLeft: 10,
    color: 'rgba(16, 134, 255, 1)'
  },
  container: {
    marginTop: 49,
    paddingHorizontal: 19,
    height: 78,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  city: {
    color: theme.colorPrimary,
    fontFamily: 'lt-light'
  },
  secondaryText: {
    color: theme.colorSecond,
    fontSize: theme.fontSizeSecondary,
    fontFamily: 'lt-light'
  },
  degreesContainer: {
    flexDirection: 'row',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  location: {
    flexDirection: 'row'
  },
  locationImage: {
    marginRight: 10,
  },
  degreeImage: {
    marginTop: 10,
    marginRight: 10
  },
  degrees: {
    flexDirection: 'row',
    height: 29,
    borderWidth: 1,
    borderColor: theme.colorSecond,
    borderRadius: 8,
    overflow: 'hidden'
  },
  degreesOption: {
    fontSize: theme.fontSizePrmary,
    paddingHorizontal: 14,
    color: theme.colorSecond,
    fontFamily: 'lt-bold'
  }
})