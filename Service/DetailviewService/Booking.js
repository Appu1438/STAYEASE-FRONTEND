import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";





    
export default async function submitBooking  ({navigation,userData,Hoteldata,unformatedselectedFromDate,unformatedselectedToDate,Rooms,Guests,Total,setloading})  {
    console.log(Rooms)
    if (Rooms <= Guests) {
        console.log('book')
        try {
            const token = await AsyncStorage.getItem('token');
            const bookingData = {
                userId: userData._id,
                username: userData.name,
                usernumber: userData.number,
                hotelId: Hoteldata._id,
                hoteluserId: Hoteldata.hoteluserid,
                hotelName: Hoteldata.hotelname,
                BookedAt: new Date(),
                CheckIn: unformatedselectedFromDate,
                CheckOut: unformatedselectedToDate,
                Rooms: Rooms,
                Guests: Guests,
                BookingId: generateBookingId(6),
                TotalAmount: parseInt(Total) + parseInt(Hoteldata.taxandfee),
                BookingStatus: "Confirmed",
                PaymentStatus: 'Not paid'
                // Add other booking details as needed
            };
            const response = await axios.post(`${API_BASE_URL}/submit-booking`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setloading(false)
            if (response.data.status === 'ok') {
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
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error submitting booking:', error);
            Toast.show({
                type: 'error',
                text1: 'Error submitting booking',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }

    } else {
        setloading(false)
        Toast.show({
            type: 'error',
            text1: 'Please fill Rooms and Guests Correctly',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
};

function generateBookingId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let bookingId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        bookingId += characters[randomIndex];
    }
    return bookingId;
}





