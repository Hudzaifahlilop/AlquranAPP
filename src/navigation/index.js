import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import DetailSurah from '../screens/DetailSurah';
import TafsirAyat from '../screens/TafsirAyat';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Detail" component={DetailSurah}/>
            <Stack.Screen name="Tafsir" component={TafsirAyat}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation