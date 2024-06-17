// App.js
import * as React from 'react';
import { View, Text, Button, TouchableOpacity,StyleSheet } from 'react-native';


function PleaseLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please Login First</Text>
     
      <TouchableOpacity
      style={styles.btn}
      onPress={()=>navigation.navigate('UserLogout')}>
      <Text style={styles.btntext}> Login </Text>

      </TouchableOpacity>
        
    </View>
  );
}



const styles =StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  btn:{
    width: 180,
    height: 40,
    backgroundColor: '#f73939',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    borderRadius: 10,
    elevation: 5
  },
  btntext:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  }
});


export default PleaseLoginScreen