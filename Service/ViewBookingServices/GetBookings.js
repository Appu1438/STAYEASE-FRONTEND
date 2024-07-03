import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import separateBookings from "./SeperateBooking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";



async function getBookings(UserData,setBookingDetails,setUpcomingBookings,setCancelledBookings,setExpiredBookings,navigation) {
    const token = await AsyncStorage.getItem('token');

    try {
        // console.log("getbookings")
        const userId = UserData._id;
        const response = await axios.get(`${API_BASE_URL}/user/get-user-bookings/${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if (response.data.status == 'ok') {
            // console.log(response.data.data)
            setBookingDetails(response.data.data);
            separateBookings(response.data.data,setUpcomingBookings,setCancelledBookings,setExpiredBookings)
           
        } if(response.data.status=='NotOk'){
            TokenExpiry(navigation,response)
        } else {
            // Toast.show({
            //     type: 'error',
            //     text1: JSON.stringify(response.data.data),
            //     visibilityTime: 3000,
            //     position: 'bottom'
            // });
        }
    } catch (error) {
        console.error('Error fetching booking details:', error);
    }
}

export default getBookings