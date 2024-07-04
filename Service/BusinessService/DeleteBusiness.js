import axios from "axios"
import Toast from "react-native-toast-message"
import API_BASE_URL from "../../../Api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TokenExpiry from "../TokenService/TokenExpiry"
AsyncStorage


async function handleDelete(_id, navigation) {
    const token = await AsyncStorage.getItem('token');

    console.log('Dlt')
    axios.post(`${API_BASE_URL}/hotel/delete-business`, { _id: _id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        console.log(res.data.data)
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
        console.log(err)
    })
}

export default handleDelete