import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import separateBookings from "../ViewBookingServices/SeperateBooking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";
separateBookings

async function getBusinessBookings(_id, setBookingDetails, setUpcomingBookings, setCancelledBookings, setExpiredBookings,navigation) {
    const token = await AsyncStorage.getItem('token');
    try {
        console.log("getbookings")
        const hoteluserId = _id;
        const response = await axios.get(`${API_BASE_URL}/hotel/get-business-bookings/${hoteluserId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.status == 'ok') {
            // console.log(response.data.data)
            setBookingDetails(response.data.data);
            console.log(response.data.data)
            separateBookings(response.data.data, setUpcomingBookings, setCancelledBookings, setExpiredBookings)

        } else if (response.data.status == 'NotOk') {
            TokenExpiry(navigation, response)
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (error) {
        console.error('Error fetching booking details:', error);
    }
}

export default getBusinessBookings