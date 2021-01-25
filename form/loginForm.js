import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import schema from '../scheme/registrationScheme'
import {connect} from 'react-redux' 
import userGetDataSuccess from '../store/action/userAction.js'


async function loginUser(log, pas, setShow, userGetDataSuccess){
  let validate = await schema.validate({login: log, password: pas});
  if(validate.error){
    alert(validate.error);
  }
  else{
    let arrayOfData = await AsyncStorage.getItem('users');
    if(arrayOfData && log && pas){
      arrayOfData = JSON.parse(arrayOfData);
      let user = arrayOfData.find( element => element.log === log && element.pas === pas);
      if(user){
        userGetDataSuccess(user);
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        setShow('welcomePage'); 
      }
      else{
          alert('Login or password is not correct');
      }
    }
  }
}


class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = ({login: '', password: ''});
  }
  render(){
    return(
      <View style = {styles.container}>
      <Text style = {styles.textStyle} >Enter your login</Text>
      <TextInput  style = {styles.textInputStyle} onChange = {(e) => this.setState({ login: e.target.value})}></TextInput>
      <Text style = {styles.textStyle} >Enter your password</Text>
      <TextInput style = {styles.textInputStyle} onChange = {(e) => this.setState({password: e.target.value})}></TextInput>
      <Button title = 'login' onPress = {() =>  loginUser(this.state.login, this.state.password, this.props.setShow, this.props.userGetDataSuccess)}></Button>
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

const mapDispatchToProps = {
  userGetDataSuccess
}

export default connect(null, mapDispatchToProps)(LoginForm);