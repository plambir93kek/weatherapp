import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useApi } from '../hooks/useApi'
import { theme } from '../theme/theme'

export const Description = () => {

  const { humidity, wind, pressure } = useApi()

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>Ветер</Text>
          <Text style={styles.info}>{wind} м/с</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>Давление</Text>
          <Text style={styles.info}>{(Number(pressure)*0.750063755419211).toFixed(0)} мм рт. ст.</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>Влажность</Text>
          <Text style={styles.info}>{humidity}%</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>Вероятность дождя</Text>
          <Text style={styles.info}>10%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 17
  },
  itemContainer: {
    width: '50%',
    marginBottom: 20
  },
  name: {
    color: theme.colorSecond,
    fontSize: 15,
    fontFamily: 'lt-bold'
  },
  info: {
    color: theme.colorPrimary,
    fontSize: 18,
    fontFamily: 'lt-light'
  }
})

