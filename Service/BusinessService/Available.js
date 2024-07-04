import axios from "axios";
import API_BASE_URL from "../../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";


export default async function ActiveHotel(itemID,navigation) {
    const token = await AsyncStorage.getItem('token');


    try {
        const response = await axios.post(`${API_BASE_URL}/hotel/activate-hotel`, { id: itemID }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.status == 'ok') {
            Toast.show({
                type: 'success',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
        } else if (response.data.status == 'NotOk') {
            TokenExpiry(navigation, response)
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
        }
    } catch (error) {
        console.log(error)
    }

}