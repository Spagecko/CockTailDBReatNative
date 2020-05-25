import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView ,TextInput } from 'react-native';
import {Input } from 'react-native-elements';

 export default class LoginPage extends  React.Component
{
    state = { 
        username: '',
        password: '', 
       /// isLogin: false, 
    }

    render() { 
        
    console.log(this.isLoggedIn); 
         return (<ScrollView style = {{padding: 20 }}>

             <Text style = {{fontsize : 27 }}>
                 Login
             </Text>
             <Input inputStyle = {styles.inputStyle} placeholder = "Username"></Input>
             <Input inputStyle = {styles.inputStyle} placeholder = "password"></Input>
             <View style ={{margin: 7 }} /> 
             <Button title = "Submit"></Button>
        
         </ScrollView>);
    }
}
const styles = StyleSheet.create({
    textStyle: {
        color:'#faf8f2',
    },

    inputStyle :{
        color: '#faf8f2',
        backgroundColor: '#4A4C63  ',
        padding: 20, 
        
        

    }
})


