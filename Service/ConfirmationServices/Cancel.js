import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import initiateRefund from "./InitiateRefund";



async function CancelBooking(BookingDetails,UserData,setLoading,navigation,RefundedAmount) {
    try {
        const response = await axios.post(`${API_BASE_URL}/cancel-booking`, { id: BookingDetails._id });
        // console.log(response);

        setLoading(false);

        if (response.data.status === 'ok') {
            if (BookingDetails.PaymentStatus == 'paid') {
                Toast.show({
                    type: 'success',
                    text1: 'Booking is Cancelled',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                await initiateRefund(BookingDetails,UserData,RefundedAmount,navigation)
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Booking is Cancelled',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                navigation.navigate('Bookings', { data: UserData });
                navigation.navigate('Confirmation', { data: BookingDetails._id });
            }

        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        Toast.show({
            type: 'error',
            text1: 'An error occurred while cancelling the booking',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
}


export default CancelBooking