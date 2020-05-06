/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View ,StyleSheet } from 'react-native';
import TestPage from './components/Display/TestPage';
import Navbar from './containers/navBar'
import testPage from './components/Display/TestPage';
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import Details from './components/Display/Details';
//require('dotenv').config();
const Stack = createStackNavigator();

const App =() => {
  return (

    <NavigationContainer theme = {DarkTheme} ref={navigationRef} >
      <Stack.Navigator>
        <Stack.Screen style = {styles.background} name="SuperCocktail" component={Navbar} 
         options={{
          title: 'Super Cocktail App ',
          headerStyle: {
            backgroundColor: '#24292D',
            fontFamily:"Pattaya-Regular"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
           
          },
        }}/>
        <Stack.Screen name="Details" component={Details}
          options={{
            title: 'Details Page',
            headerStyle: {
              backgroundColor: '#24292D',
              fontFamily:"Pattaya-Regular"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  
  );
};
const styles = StyleSheet.create({ 
  background:
  {
    backgroundColor : '#24292D',


  }
})
export default App;
