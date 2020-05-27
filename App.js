import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme} from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './containers/navBar';
import Details from './components/Display/Details';
import loginPage from './containers/loginPage';
import RegisterPage from './containers/Register';
const Stack = createStackNavigator(); 
import { createStore, applyMiddleware } from 'redux'; 
import rootReducer from './redux/reducers/rootReducer'; 
import thunk from 'redux-thunk'; 
import {Provider} from 'react-redux';
import {getFiretore} from  'redux-firestore'; 
import {gerFirebase} from 'react-redux-firebase';

export default  class App extends  React.Component {

  state = { 
    isLoggedIn : false 
  }
  render() {
    const store = createStore(rootReducer,  applyMiddleware(thunk.withExtraArgument({getFirebase, getFiretore}))); 
  return (

    <Provider store = {store}>
      <NavigationContainer theme = {DarkTheme} ref={navigationRef} > 
     <Stack.Navigator>
     <Stack.Screen style = {styles.background} name="SuperCocktail" component={Navbar} 
         options={{
          title: 'Super Cocktail App ',
          headerStyle: {
            backgroundColor: '#24292D',
          
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
            
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
          <Stack.Screen name="Login" component={loginPage}
          options={{
            title: 'Login Page',
            headerStyle: {
              backgroundColor: '#24292D',
            
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
          <Stack.Screen name="Register" component={RegisterPage}
          options={{
            title: 'Register Page',
            headerStyle: {
              backgroundColor: '#24292D',
            
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>


     </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
        }
}


const styles = StyleSheet.create({ 
  background:
  {
    backgroundColor : '#24292D',


  }
})

