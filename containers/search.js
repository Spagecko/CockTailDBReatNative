import React, {Component} from 'react';
import APIKey from '../APIKEYS/CocktailAPIKEY'; // grab the random api key from this file
import {View,  FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import * as RootNavigation from '../RootNavigation';
import Fuse from "fuse.js";
import allDrinksDB from '../APIStorage/APIstorage/categories.json'; 
import getEnvVars from '../environment';
const { apiKey1} = getEnvVars();


//require('dotenv').config()
import {
  Button,
  ThemeProvider,
  ButtonGroup,
  SearchBar,
  List,
  ListItem,
} from 'react-native-elements';
import LinkedItem from '../components/UserIO/linkedItems';
const searchByNameSetting = {
  //includeScore: true,
  keys: ['strDrink']
};
const searchByName = new Fuse(allDrinksDB.drinks, searchByNameSetting); 
async function   onListItemClick(id) // async function
{
  
  let myItem = null;
  await axios({ // TELLING JAVA SCRIPT DO NOT MOVE FORWARD TILL THE HTTP REQUEST IS FINNISHED
    "method":"GET",
    "url":"https://the-cocktail-db.p.rapidapi.com/lookup.php",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": apiKey1 //lookup API KEY 
    },"params":{
    "i": +id
    }
    })
    .then((response)=>{
      //console.log(response.data)
      myItem = response.data;
    })
    .catch((error)=>{
      console.log(error)
    })
   
    RootNavigation.navigate('Details', {Id:id, dataBlock: myItem}); // using root navagation 
}
 
class Search extends React.Component  {
  state = {
    SearchSetting: '',
    search: '',
    CurrentList: [],
    CurrentRandom: [],
    selectedIndex: 0,
    disabled: [0],
    data: '',
  };

  componentDidMount() {
  }
  updateSearch = (search) => {
    this.setState({search});
    if( this.state.disabled == false) // truthy vs falsly values 
    {
    this.getInfo(search); // use api to find drink by ingredient 
    }
    else{
    this.getInfoByName(search); // uses the cold storage json to search for drinks
    }
   
  };

  getInfoByName = (search) => 
  { 
    let emptyTemp = {
      "drinks": []
    }
    let tempSearch = searchByName.search(search);
    for (let x of  tempSearch)
    {
    
      emptyTemp.drinks.push(x.item);
  
    }
    this.updateData(emptyTemp);
    return emptyTemp;
  }

  
  
  getInfo = (search) => {
  
    //console.log(search);
    let results= null ;
    axios({
      "method":"GET",
      "url":"https://the-cocktail-db.p.rapidapi.com/filter.php",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": apiKey1 // search API KEY 
      },"params":{
      "i":search
      }
      })
      .then((response)=>{
      // console.log(response.data.drinks);
       this.updateData(response.data);
      })
      .catch((error)=>{
        console.log(error)
      })

    return results 
  }                      
      
  
  randomButtonHandler = () => {
    const myCockTailAPI = APIKey;
    let dataImutable = [];
    fetch('https://the-cocktail-db.p.rapidapi.com/random.php', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': apiKey1,
      },
    })
      .then((response) => response.json())

      .then((responseJson) => {
        //console.log("DRINK NAME ");

        //console.log(dataImutable);

        this.updateData(responseJson);
      })

      .catch((error) => {
        console.error(error);
        dataImutable = [error];
      });

     
  
  };
  updateData = (myData) => {
    this.setState({data: myData});


    // console.log(this.state.data);
  };
  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
    this.setState({disabled: [selectedIndex]});
  
  };

  onPressItem = (index) => {
    console.log('you have pressed me I AM ');
    console.log(index);
  };



  
  renderItem = ({item})=>
  (
    
    <ListItem containerStyle  = {styles.listItem}
    titleStyle = {styles.listItemText}
    leftAvatar={{source: {uri: item.drink_img_url}}}
    key={item.name}
    title={item.name}
    subtitle={item.subtitle}
    onPress={onListItemClick.bind( this, item.subtitle)} // navagates to details page 
  />
  )
  keyExtractor = (item, index) => index.toString()
  render() {

    const buttons = ['Search by ingredient', 'Search By Name'];

    let dataTemp = this.state.data;
    let myList = [];
    let renderThisList = null;
    if (this.state.data.length !== 0) {
      if (dataTemp.drinks !== undefined) {
        for (let i in dataTemp.drinks) {
         
          myList.push({
            name: dataTemp.drinks[i].strDrink,
            drink_img_url: dataTemp.drinks[i].strDrinkThumb,
            subtitle: dataTemp.drinks[i].idDrink,
          });
        }
        if (myList !== null) {
          renderThisList = myList.map((l) => (
            <ListItem 
              leftAvatar={{source: {uri: l.drink_img_url}}}
              key={l.name}
              title={l.name}
              subtitle={l.subtitle}
              onPress={() => props.navigation.navigate("Details")}
            />
          ));
        }
      }
    }
    let placeholder = ""; 
    let i = null;
   // console.log(this.state.disabled);
    if(this.state.disabled == false) // using truthy and falsly values 
    {
      placeholder = "Search Ingredient here"
    }
    else{
      placeholder = "Search Name here"
    }
   

    const {selectedIndex} = this.state.selectedIndex;
    const {search} = this.state;
    return (
      <View style = {styles.background}>
        <View style={{flexDirection: 'column', paddingTop: 15 }} >
          <SearchBar
            placeholder= {placeholder}
            value={search}
            onChangeText={this.updateSearch}
             containerStyle= {styles.searchBar}
             inputContainerStyle = {styles.searchBarInput}
          />
        </View>
        <View style={{flexDirection: 'column', flex: 1, paddingTop:20 } }>
          <ButtonGroup
            containerStyle = {styles.buttonGroupContainer}
            buttonStyle = {styles.buttonGroup}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            textStyle = {{color : "#fff"}}
            containerStyle={{height: 100}}
            disabled={this.state.disabled}
          />
     
        </View>
        
        <View style={{flexDirection: 'column', flex:2  }}>
        <FlatList  style = { styles.flatListBackground}
        keyExtractor={this.keyExtractor}
        data={myList}
        renderItem={this.renderItem}
      
      />
         <Button onPress={this.randomButtonHandler} title="Random Drink" />
      </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  background:
  {
    backgroundColor : '#24292D',
    flex: 1
  },
  searchBar:
  {
    backgroundColor: "#5E5E5E",
    borderRadius: 1,
    borderBottomWidth: 1
  
  },
  searchBarInput:
  {
    borderColor: "#d68d1e",
    borderWidth : 1,
    borderBottomWidth: 2

  },
   
   flatListBackground:
   {
      backgroundColor: '#24292D',
   },

   listItem:
   {
    backgroundColor: '#5E5E5E',
  
    borderBottomColor: "#d68d1e", 
    borderBottomWidth: 2,
    
   },

   buttonGroupContainer:
   {
     
      paddingTop:60,
      marginBottom: 3, 
   },

   buttonGroup:
   {
      paddingTop: 1,
      backgroundColor: '#5E5E5E',
      backgroundColor: '#5E5E5E',
   },

   buttonGroupDisable:
   {

   }, 

   listItemText: 
   {
    color: '#faf8f2',
    fontSize:18,

   },

  text: {
    fontSize: 16,
    color: '#faf8f2',
  
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
export default Search;
