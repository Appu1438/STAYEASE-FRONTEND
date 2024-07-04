import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";


export default async function initiateRefund(BookingDetails,UserData,RefundedAmount,navigation) {


    const data = {
        paymentMethodId: BookingDetails.PaymentDetails[0].paymentMethodId,
        // amount: BookingDetails.PaymentDetails[0].amount,
        amount: RefundedAmount * 100,
        id: BookingDetails._id
    };
    try {
        const res = await axios.post(`${API_BASE_URL}/refund`, data);
        if (res.data.status === 'ok') {
            Toast.show({
                type: 'success',
                text1: 'Refund Initiated',
                visibilityTime: 3000,
                position: 'bottom'
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error In Initiating Refund',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (err) {
        console.error(err);
        Toast.show({
            type: 'error',
            text1: 'An error occurred while initiating refund',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
    navigation.navigate('Bookings', { data: UserData });
    navigation.navigate('Confirmation', { data: BookingDetails._id });
}