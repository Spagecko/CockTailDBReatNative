import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import * as RootNavigation from '../RootNavigation';
const textColoOnOverlayHeaders = { 
  color: '#FFFFFF',
  fontSize: 32,


}

function handlerLogin() {
  RootNavigation.navigate("Login", {})
}

function handlerRegister()  {
  RootNavigation.navigate("Register", {})
}
const  userList = () => {
  return (
      <View style = {styles.ViewBody}>
    <Text style = {textColoOnOverlayHeaders}>Hello this is the user list page </Text>
    <Text style = {textColoOnOverlayHeaders}>Please login to use this feature</Text>
    <View style = {styles.Row}>
    <Button buttonStyle = {styles.buttonStyles} title = "Login" onPress = {handlerLogin}></Button>
    <Button  buttonStyle = {styles.buttonStyles} title = "Register" onPress = {handlerRegister}></Button>
    </View>
    </View>
  );
}
export default userList;
const styles = StyleSheet.create({
  buttonStyles:
  {
    width: 100,
    height: 60
    
  },

  Row:
  {
  
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },

  ViewBody:
  {
    backgroundColor : '#24292D',
    flex:1
  },

})
