// credit to expanded list view implementation  https://aboutreact.com/expandable-list-view/
/*Example of Expandable ListView in React Native*/
import React, { Component } from 'react';
import {List,
  ListItem,
} from 'react-native-elements';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import axios from 'axios';
const BeerDB = require('../APIStorage/APIstorage/Beer.json'); 
const CocktailDB = require ('../APIStorage/APIstorage/Cocktails.json'); 
const ShotDB = require('../APIStorage/APIstorage/Shots.json'); 
const  CocaDB = require ('../APIStorage/APIstorage/Coca.json'); 
const CoffeeDb = require('../APIStorage/APIstorage/CoffeeTea.json');
const HomeLiqueurDB  = require('../APIStorage/APIstorage/HomeMadeLiqueur.json'); 
const MilkDB =require('../APIStorage/APIstorage/MilkFloatTea.json'); 
const punchDB = require ('../APIStorage/APIstorage/PartyPunch.json'); 
const otherDB = require('../APIStorage/APIstorage/Other.json'); 
const sodaDB = require('../APIStorage/APIstorage/Soda.json');
import * as RootNavigation from '../RootNavigation';
import {db } from '../APIKEYS/Firebase/firebase';
let itemsRef = db.ref('/RAPID_API');
let APIRef = null;
//import basic react native components

async function   onListItemClick(id, APIKey) // async function
{
  
  let myItem = null;
  await axios({ // TELLING JAVA SCRIPT DO NOT MOVE FORWARD TILL THE HTTP REQUEST IS FINNISHED
    "method":"GET",
    "url":"https://the-cocktail-db.p.rapidapi.com/lookup.php",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": APIRef
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

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
     // console.log("items");
      //console.log(items.join(""));
     // console.log("items end");
      APIRef = items.join(""); 
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) { // fix this later 
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }
  renderItem = ({item , APIKey})=>
  (
    
    <ListItem
    containerStyle  = {styles.listItem}
    titleStyle = {styles.listItemText}
   
    key={item.strDrink}
    title={item.strDrink}
    subtitle={item.idDrink}
    onPress={onListItemClick.bind( this, item.idDrink , APIRef)} // navagates to details page 
  />
  )

  render() {
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item props.item.subcategory*/}
          <FlatList style = {this.scrollViewStyle} 
        keyExtractor={this.keyExtractor}
        data={this.props.item.subcategory}
        renderItem={this.renderItem}
      />
        </View>
      </View>
    );
  }
}

export default class App extends Component {
  //Main View defined under this Class
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: CONTENT };
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
       
        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.category_name}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#24292D',
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
    color : '#fff'
  },
  header: {
    backgroundColor: '#24292D',
    padding: 16,
    color : '#fff',
    borderBottomColor: "#d68d1e", 
    borderWidth: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    fontFamily:"Pattaya-Regular"
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
  listItemText: 
  {
    fontSize:18,
   color: '#faf8f2',
   fontFamily:"Pattaya-Regular"
  },
  listItem:
   {
    backgroundColor: '#5E5E5E',
  
    borderBottomColor: "#d68d1e", 
    borderBottomWidth: 2,
    
   },


});

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Beer',
    subcategory: BeerDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Coca',
    subcategory: CocaDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Cocktails',
    subcategory: CocktailDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Coffee/Tea',
    subcategory: CoffeeDb.drinks,
  },
  {
    isExpanded: false,
    category_name: 'HomeMadeLiqueur',
    subcategory: HomeLiqueurDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Milk/Float/Tea',
    subcategory: MilkDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Party / Punch',
    subcategory: punchDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Shots',
    subcategory:  ShotDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Soda',
    subcategory: sodaDB.drinks,
  },
  {
    isExpanded: false,
    category_name: 'Other',
    subcategory: otherDB.drinks,
  },
 
];