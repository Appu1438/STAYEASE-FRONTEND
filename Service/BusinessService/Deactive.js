import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";



export default async function DeactiveHotel(itemID) {

    try {
        const response = await axios.post(`${API_BASE_URL}/hotel/deactivate-hotel`, { id: itemID })
        if (response.data.status == 'ok') {
            Toast.show({
                type: 'success',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
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