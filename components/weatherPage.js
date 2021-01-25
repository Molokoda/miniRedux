import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import {connect} from 'react-redux';


class WeatherPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {weatherForecast: '', isLoading: true, day: 0, city: ''};
  }

  componentDidMount(){
    if(!this.state.city){
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({city: location});
      })();
    }
    
    
  }

  componentDidUpdate(prevProps){
    if(this.state.city && this.state.isLoading){
      const host = `http://api.weatherapi.com/v1/forecast.json?key=668de3030ed24d8c9f833153202911&q=${this.state.city['coords'].latitude},${this.state.city['coords'].longitude}&days=3`;
      fetch(host).then(result => result.json()).then(result => {
          this.setState({weatherForecast: result});
          this.setState({isLoading: false});
      } );
    }
  }

  render(){
    if(this.state.isLoading){        
      return(
        <View style = {styles.container}>  
          <Text>Is loading...</Text>
        </View>
      )
    }
    else{
      return(
        <View style = {styles.container}>
        <Text>Welcome, {this.props.name}</Text>
        <Button title = 'today' onPress = {() => this.setState({day: 0})}></Button>
        <Button title = 'tomorrow' onPress = {() => this.setState({day: 1})}></Button>
        <Button title = 'day after tommorow' onPress = {() => this.setState({day: 2})}></Button>
        <View>
          <Text>Tempreture: {this.state.weatherForecast.forecast.forecastday[this.state.day].hour[12].temp_c}°С</Text>
          <Text>FeelsLike: {this.state.weatherForecast.forecast.forecastday[this.state.day].hour[12].feelslike_c}°С</Text>
          <Text>Chance of rain: {this.state.weatherForecast.forecast.forecastday[this.state.day].hour[12].chance_of_rain}</Text>
          <Text>Chance of snow: {this.state.weatherForecast.forecast.forecastday[this.state.day].hour[12].chance_of_snow}</Text>
          <Text>Cloud: {this.state.weatherForecast.forecast.forecastday[this.state.day].hour[12].cloud}</Text>
        </View>
        <Button title = 'logOut' onPress = {async() =>  
          {
            await AsyncStorage.setItem('isLogin', JSON.stringify(false));
            this.props.setShow('start');
          }
          }>
        </Button>
      </View>
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    textStyle:{
      color: 'black'
    },
  
    textInputStyle:{
      height: 30, 
      borderColor: 'gray', 
      borderWidth: 1,
      width: 200,
      marginBottom: 10
    },
  });


  const mapStateToProps = state => {
    return{
      name: state.user.name
    }
  }
  export default connect(mapStateToProps, null)(WeatherPage);