import { View, Text } from 'react-native'
import React from 'react'
import App from './App'
import { Provider } from 'react-redux/es/exports'
 import { store } from './src/app/store'
export default function Index():JSX.Element {
  return (
     <Provider store={store} >
       <App />
     </Provider>
  )
}