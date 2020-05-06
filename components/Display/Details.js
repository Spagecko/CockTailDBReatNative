import React, {Component} from 'react';
import { View, Image,ScrollView,ImageBackground, FlatList} from 'react-native';
import { Card, ListItem, Button, Tile,Text} from 'react-native-elements';
import axios from 'axios';
import getData from "./FetchData";
import testPage from './TestPage';

let raw = null; 
let rawData = null;
let drinkImg = null;
let drinkName = null;
let drinkInstructions = null; 
let drinkGlass = null;
let drinkAlcoholic = null;

const imgStyle = { 
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
}
const textColoOnOverlay = { 
    color: '#FFFFFF',
    fontSize: 18,
 
  
}
const textColoOnOverlayHeaders = { 
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily:"Pattaya-Regular"
  
}


const overLaySection ={ 
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height:200, 
}
function getKey(iData) //  key maker for list 
{ 
    let valueIndex = iData.item.indexKey; 
    return valueIndex
}
function renderRowData(iData) // render method for each list object
{ 

    let valueIndex = iData.item.indexKey; 
    let valueIngredient = iData.item.ingredient; 
    let valueMeasurement = iData.item.measurement;
    console.log(valueMeasurement);
    return(
        <View style ={{flexDirection: 'row'}}  > 
        <Text style = {textColoOnOverlay}>{ valueIndex}.{" "} {valueIngredient} {" "} {valueMeasurement} </Text>
        </View>
    );
}
const  detailsPage =   ({ route, navigation }) => {

    let helper = null;
    const { Id } = route.params;
    const { dataBlock } = route.params;
    console.log(dataBlock); 
   // console.log("Page id "); 
    //console.log(Id);
    //console.log(dataBlock.drinks[0].strDrink);
    let p =  dataBlock.drinks[0];
  
    let ingredientKey = "strIngredient";
    let measurementKey = "strMeasure";
    let ingredientList = []; 
    

    //let testValue = p[ingredientKey + String(1)];
    //console.log(testValue);
   // let test = ingredientKey + String(1); 
    //console.log(test)
    for (let i = 1; i <15; i ++ ) 
    { 
   
        let index = String(i); 
 
        if(p[ingredientKey + String(i)] == null)
        {
            console.log("end for loop"); 
            break;
        }
        else
        {
            let iValue = p[ingredientKey + String(i)]; 
            let mValue = p[measurementKey + String(i)]; 
      
            ingredientList.push({indexKey: index, ingredient:iValue, measurement: mValue});
        }
    }
        console.log(ingredientList);
        
       
    


    const drinkName = dataBlock.drinks[0].strDrink;
    const drinkInstructions = dataBlock.drinks[0].strInstructions;
    const drinkImg = {uri :dataBlock.drinks[0].strDrinkThumb};
    const drinkAlcoholic = dataBlock.drinks[0].strAlcoholic;
    const drinkCategory = dataBlock.drinks[0].strCategory;
    const drinkGlass = dataBlock.drinks[0].strGlass;

    //storing the data 
  
  return (

    
    <ScrollView style={{flex: 1, flexDirection: 'column'}}>
        
    <View style={{ height: 300, }} >
    <ImageBackground source = {drinkImg} style = {imgStyle}>
    <View style = {overLaySection}>
    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 55, justifyContent: 'center', alignItems: 'center'}}>
  <Text  style= {textColoOnOverlayHeaders}>{drinkName}</Text>
  <View>
  <Text style = {textColoOnOverlay}>{drinkCategory}</Text>
  <Text style = {textColoOnOverlay}>{drinkAlcoholic}</Text>
  <Text style = {textColoOnOverlay}>Glass type: {drinkGlass}</Text>
  </View>
  </View>

</View>
    </ImageBackground>

    
    </View>
    <View style={{ minHeight: 200, backgroundColor: '#24292D'}} >
        <Text style = {textColoOnOverlayHeaders}>Ingredients</Text>
  
        <FlatList
        style ={{margin: 40} }
        data = {ingredientList}
        renderItem = {renderRowData} 
        keyExtractor= {item => item.id}
        />

    </View>
    <View style={{ minHeight:200,  backgroundColor: '#24292D'}}>
    <Text  style = {textColoOnOverlayHeaders} >Instructions</Text>
    <ScrollView>
  <Text style = {textColoOnOverlay} >{drinkInstructions}</Text>
  </ScrollView>
    </View>
    </ScrollView>
  
    

  


  

   
  );
}
export default detailsPage;

