import gethotelDetails from "../GetHotelServices/HotelbyId";
import getOffer from "./GetOffer";

import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";

async function getBookingdetails(BookingID, setBookingDetails, setHotelData, setTotal, setNormalMessage, setOfferMessage, setBookingsts, setCheckin, navigation) {
    const token = await AsyncStorage.getItem('token');

    try {
        const _id = BookingID;
        const response = await axios.get(`${API_BASE_URL}/user/get-booking-deatils/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.status === 'ok') {
            setBookingDetails(response.data.data);
            setTotal(response.data.data.TotalAmount);

            await gethotelDetails(response.data.data.hotelId, setHotelData);
            setBookingsts(response.data.data.BookingStatus)
            await getOffer(response.data.data, setTotal, setNormalMessage, setOfferMessage, setBookingsts)
            setCheckin(new Date(response.data.data.CheckIn))


        } else if (response.data.status == 'NotOk') {
            TokenExpiry(navigation, response)
        } else {
            Toast.show({
                type: 'error',
                text1: 'Failed to get booking details',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (error) {
        console.error('Error fetching booking details:', error);
    }
}


export default getBookingdetails