import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"

const TokenExpiry = async (navigation,response) => {
console.log('token expiry')
    Toast.show({
        type: 'error',
        text1: JSON.stringify(response.data.data),
        text2: 'Please Login Again',
        position: 'bottom'
    })
    await AsyncStorage.setItem('isLoggedIn', '')
    await AsyncStorage.setItem('token', '')
    await AsyncStorage.setItem('userType', '')
    navigation.navigate('UserLogout')


    return ;

}

export default TokenExpiry