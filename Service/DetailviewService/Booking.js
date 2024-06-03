import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";





    
export default async function HotelBooking  (bookingData,navigation,token,setloading)  {
        console.log('book')

        const response = await axios.post(`${API_BASE_URL}/user/submit-booking`, bookingData);
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
            } else {
                // Handle error from the backend, e.g., display an error message to the user
                Toast.show({
                    type: 'error',
                    text1: 'Failed to book',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
    } 






