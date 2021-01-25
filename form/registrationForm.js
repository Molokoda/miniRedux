import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import schema from '../scheme/registrationScheme'

async function reg(log, pas, name){
  let validate = await schema.validate({login: log, password: pas});
  if(validate.error){
    alert(validate.error);
  }
  else{
    let arrayOfData = await AsyncStorage.getItem('users');
    if(arrayOfData && log && pas){
        arrayOfData = JSON.parse(arrayOfData);
        let user = arrayOfData.find( element => element.log === log);
        if(user){
            alert('User with such login already exist');
        }
        else{
            arrayOfData.push({log, pas, name});
            await AsyncStorage.setItem('users', JSON.stringify(arrayOfData));
            alert('success');
        }
    }
    else if(log && pas){
        
        await AsyncStorage.setItem('users', JSON.stringify([{log, pas}]));
    }
  } 
}

class RegistrationForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {login: '', password: '', name: ''};
  }
  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.textStyle} >Enter your login</Text>
        <TextInput  style = {styles.textInputStyle} onChange = {(e) => this.setState({login: e.target.value})}></TextInput>         
        <Text style = {styles.textStyle} >Enter your password</Text>
        <TextInput style = {styles.textInputStyle} onChange = {(e) => this.setState({password: e.target.value})}></TextInput>
        <Text style = {styles.textStyle} >Enter your name</Text>
        <TextInput style = {styles.textInputStyle} onChange = {(e) => this.setState({name: e.target.value})}></TextInput>
        <Button title = 'registration' onPress = {() =>  reg(this.state.login, this.state.password, this.state.name)}></Button>
        <Button title = 'back' onPress = {() =>  this.props.setShow('start')}></Button>
     </View>
    )
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


export default RegistrationForm;