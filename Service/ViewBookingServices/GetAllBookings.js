import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import separateBookings from "./SeperateBooking";
import { store } from "../../Redux/Store";
import { setAllBookings } from "../../Redux/Bookings";


async function getAllBookings() {
    try {
        // console.log("getbookings")
        const response = await axios.get(`${API_BASE_URL}/get-all-bookings`);
        if (response.data.status == 'ok') {
            // console.log(response.data.data)
            store.dispatch(setAllBookings(response.data.data))
            // setBookingDetails(response.data.data);
            // separateBookings(response.data.data,setUpcomingBookings,setCancelledBookings,setExpiredBookings)
        
        } else {
           console.log(JSON.stringify(response.data.data))
        }
    } catch (error) {
        console.error('Error fetching booking details:', error);
    }
}

export default getAllBookings