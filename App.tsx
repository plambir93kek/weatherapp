import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ApiProvider } from './app/API/ApiProvider';
import { Description } from './app/components/Description';
import { Header } from './app/components/Header';
import { Main } from './app/components/Main';

export default function App() {

  const [degreesType, setDegreesType] = useState('celsius')

  return (
    <ApiProvider>
      <View style={styles.container}>
        <Header degreesType={degreesType} onChangeDegreesType={setDegreesType} />
        <Main degreesType={degreesType} />
        <Description />
        <StatusBar />
      </View>
    </ApiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7290B9',
    justifyContent: 'space-between',
  },
});
