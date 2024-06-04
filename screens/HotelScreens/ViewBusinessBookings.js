import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Modal, StyleSheet, TouchableOpacity, useWindowDimensions, ActivityIndicator, FlatList } from "react-native";
import { Styles } from "../../components/Common Component/Styles";

import React, { useEffect, useState } from "react";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import Upcoming from "../../components/BusinessBookingComponent/Upcoming";
import Expired from "../../components/BusinessBookingComponent/Expired";
import Cancelled from "../../components/BusinessBookingComponent/Cancelled";
import { useSelector } from "react-redux";
import separateBookings from "../../Service/ViewBookingServices/SeperateBooking";
import getBusinessBookings from "../../Service/BusinessService/getBusinessBooking";
import getAllBookings from "../../Service/ViewBookingServices/GetAllBookings";


export default function BusinessBookings() {
    const navigation = useNavigation()
    const route = useRoute()

    // const [UserData, setUserData] = useState()
    const UserData = useSelector(state => state.user.userData)


    // const allBookings = useSelector(state => state.booking.Bookings.AllBookings)
    // const BookingDetails = allBookings.filter(booking => booking.hoteluserId == UserData._id)
     const [BookingDetails,setBookingDetails]=useState([])

    const [UpcomingBookings, setUpcomingBookings] = useState([])
    const [CancelledBookings, setCancelledBookings] = useState([])
    const [ExpiredBookings, setExpiredBookings] = useState([])

    const [selectedBooking, setSelectedBooking] = useState('Upcoming')





    useEffect(() => {
        
        getAllBookings()
        // Fetch bookings only when UserData._id is available
        if (UserData && UserData._id) {

            getBusinessBookings(UserData._id,setBookingDetails,setUpcomingBookings,setCancelledBookings,setExpiredBookings)
            separateBookings(BookingDetails, setUpcomingBookings, setCancelledBookings, setExpiredBookings)
        }
    }, [UserData]); // Run this effect whenever UserData changes





    return (

        <View style={Styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={{ left: '5%', top: '3%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Business Bookings</Text>
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