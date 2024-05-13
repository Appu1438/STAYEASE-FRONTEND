import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import separateBookings from "./SeperateBooking";



async function getBookings(UserData,setBookingDetails,setUpcomingBookings,setCancelledBookings,setExpiredBookings) {
    try {
        // console.log("getbookings")
        const userId = UserData._id;
        const response = await axios.get(`${API_BASE_URL}/get-user-bookings/${userId}`);
        if (response.data.status == 'ok') {
            // console.log(response.data.data)
            setBookingDetails(response.data.data);
            separateBookings(response.data.data,setUpcomingBookings,setCancelledBookings,setExpiredBookings)
            // Toast.show({
            //     type: 'success',
            //     text1: 'Your Bookings',
            //     visibilityTime: 3000,
            //     position: 'bottom'
            // });
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

export default getBookings