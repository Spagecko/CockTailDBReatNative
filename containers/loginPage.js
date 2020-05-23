import React from 'react'; 
import { Text, View, StyleSheet, FlatList } from 'react-native';
const loginPage  =   ({ route, navigation })=>{
    return(
    <View>
        <Text style = {styles.textStyle}>Hello Login Page</Text>
    </View>
    );

}
const styles = StyleSheet.create({
    textStyle: {
        color:'#faf8f2',
    }
})


export default loginPage;