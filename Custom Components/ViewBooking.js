import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Modal, StyleSheet, TouchableOpacity, useWindowDimensions, ActivityIndicator, FlatList } from "react-native";
import { Styles } from "../Common Component/Styles";

import { useEffect, useState } from "react";
import Loading from "../Common Component/loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faUserGroup, faSquareParking, } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays, faUser, faBed } from "@fortawesome/free-solid-svg-icons"
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Feather from 'react-native-vector-icons/Feather';
import Upcoming from "../ViewBookingComponent/Upcoming";
import Cancelled from "../ViewBookingComponent/Cancelled";
import Expired from "../ViewBookingComponent/Expired";

export default function Bookings() {
    const navigation = useNavigation()
    const route = useRoute()

    const [UserData, setUserData] = useState(route.params.data)

    const [BookingDetails, setBookingDetails] = useState([])
    const [UpcomingBookings, setUpcomingBookings] = useState([])
    const [CancelledBookings, setCancelledBookings] = useState([])
    const [ExpiredBookings, setExpiredBookings] = useState([])

    const [selectedBooking, setSelectedBooking] = useState('Upcoming')





    useEffect(() => {
        console.log(UserData)
        getBookings()
        // console.log(BookingDetails)
    }, [])



    async function getBookings() {
        try {
            // console.log("getbookings")
            const userId = UserData._id;
            const response = await axios.get(`${API_BASE_URL}/get-user-bookings/${userId}`);
            if (response.data.status == 'ok') {
                // console.log(response.data.data)
                setBookingDetails(response.data.data);
                separateBookings(response.data.data)
                Toast.show({
                    type: 'success',
                    text1: 'Your Bookings',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
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

    const separateBookings = (bookingDetails) => {
        const upcoming = [];
        const cancelled = [];
        const expired = [];

        const currentDate = new Date();

        bookingDetails.forEach(booking => {
            if (booking.BookingStatus === 'Cancelled') {
                cancelled.push(booking);
            } else if (booking.BookingStatus === 'Confirmed' && new Date(booking.CheckOut) > currentDate) {
                upcoming.push(booking);
            } else {
                expired.push(booking);
            }
        });

        setUpcomingBookings(upcoming);
        setCancelledBookings(cancelled);
        setExpiredBookings(expired);
    };



    return (

        <View style={Styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={{ left: '5%', top: '3%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Bookings</Text>
            </View>

            <View style={Styles.BookingHeading}>
                <Pressable onPress={() => setSelectedBooking('Upcoming')}>
                    <Text style={[Styles.profile, { fontSize: 17 }, selectedBooking === 'Upcoming' && styles.selectedText]}>Upcoming</Text>
                </Pressable>

                <Pressable onPress={() => setSelectedBooking('Cancelled')}>
                    <Text style={[Styles.profile, { fontSize: 17 }, selectedBooking === 'Cancelled' && styles.selectedText]}>Cancelled</Text>
                </Pressable>

                <Pressable onPress={() => setSelectedBooking('Expired')}>
                    <Text style={[Styles.profile, { fontSize: 17 }, selectedBooking === 'Expired' && styles.selectedText]}>Expired</Text>
                </Pressable>
            </View>


            <View style={{ flex: 1, marginTop: 65, alignItems: 'center', justifyContent: 'center' }}>

                {selectedBooking === 'Upcoming' ? <Upcoming Bookings={UpcomingBookings} />
                : selectedBooking === 'Cancelled' ? <Cancelled Bookings={CancelledBookings} />
                 : <Expired Bookings={ExpiredBookings} />}

            </View>
        </View>

    )

}
const styles = StyleSheet.create({
    selectedText: {
        borderBottomWidth: 2, // Add a bottom border
        borderBottomColor: 'grey', // Change the color as needed
        paddingBottom: 3, // Adjust this value as needed to move the underline down
    },
})