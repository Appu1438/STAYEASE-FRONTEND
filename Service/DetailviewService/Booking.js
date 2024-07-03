import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";






export default async function HotelBooking(bookingData, navigation, token, setloading) {

    if (token) {
        console.log('book')

        const response = await axios.post(`${API_BASE_URL}/user/submit-booking`, bookingData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setloading(false)
        if (response.data.status == 'ok') {
            // Handle success, e.g., show a success message to the user
            // console.log(response.data.data)
            navigation.navigate('Confirmation', { data: response.data.data._id })
            Toast.show({
                type: 'success',
                text1: 'Booking  successfull',
                visibilityTime: 3000,
                position: 'bottom'
            });
        } else if (response.data.status == 'NotOk') {
            TokenExpiry(navigation, response)
        } else {
            // Handle error from the backend, e.g., display an error message to the user
            Toast.show({
                type: 'error',
                text1: 'Failed to book',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } else {
        Toast.show({
            type: 'error',
            text1: 'Please login to book',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }

}






