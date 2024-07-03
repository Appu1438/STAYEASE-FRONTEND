import axios from "axios"
import API_BASE_URL from "../../Api"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TokenExpiry from "../TokenService/TokenExpiry"

const Updatebusiness = async (Hoteldata, navigation) => {
    const token = await AsyncStorage.getItem('token');

    await axios.post(`${API_BASE_URL}/hotel/update-business`, Hoteldata, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        console.log(res.data)
        if (res.data.status == 'ok') {
            Toast.show({
                type: 'success',
                text1: JSON.stringify(res.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
            navigation.navigate('Homepage')
        } else if (res.data.status == 'NotOk') {
            TokenExpiry(navigation, res)
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(res.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
        }
    }).catch(err => {
        Toast.show({
            type: 'error',
            text1: 'Unknown Error Occured',
            visibilityTime: 3000,
            position: 'bottom'
        })
    })
}

export default Updatebusiness
