import React from 'react'
import { ActivityIndicator } from 'react-native'
import { theme } from '../theme/theme'

export const Loader:React.FC = () => {
  return (
    <ActivityIndicator size='large' color={theme.colorSecond} />
  )
}