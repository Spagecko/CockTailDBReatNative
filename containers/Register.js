import React from 'react'; 
import { Text, View, StyleSheet, FlatList } from 'react-native';
RegisterPage = () =>(
    <View>
        <Text style = {styles.textStyle}>Hello Register Page</Text>
    </View>

)
const styles = StyleSheet.create({
    textStyle: {
        color:'#faf8f2',
    }
})

export default RegisterPage;