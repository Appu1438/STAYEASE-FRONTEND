import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Modal, StyleSheet, TouchableOpacity, useWindowDimensions, ActivityIndicator, FlatList } from "react-native";
import { Styles } from "../Common Component/Styles";

import React, { useEffect, useState } from "react";
import Loading from "../Common Component/loading";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import getAllBookings from "../Service/ViewBookingServices/GetAllBookings";
import AllUpcoming from "../ViewAllBookingComponent/Upcoming";
import AllCancelled from "../ViewAllBookingComponent/Cancelled";
import AllExpired from "../ViewAllBookingComponent/Expired";
import separateBookings from "../Service/ViewBookingServices/SeperateBooking";

export default function AllBookings() {
    const navigation = useNavigation()
    const route = useRoute()

    // const [UserData, setUserData] = useState()


    // const [BookingDetails, setBookingDetails] = useState([])4
    const BookingDetails=useSelector(state=>state.booking.Bookings.AllBookings)

    const [UpcomingBookings, setUpcomingBookings] = useState([])
    const [CancelledBookings, setCancelledBookings] = useState([])
    const [ExpiredBookings, setExpiredBookings] = useState([])

    const [selectedBooking, setSelectedBooking] = useState('Upcoming')





    useEffect(() => {
        // Fetch bookings only when UserData._id is available
        separateBookings(BookingDetails,setUpcomingBookings,setCancelledBookings,setExpiredBookings)
    }, []); // Run this effect whenever UserData changes

  
    
  

    return (

        <View style={Styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={{ left: '5%', top: '3%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>All Bookings</Text>
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

                {selectedBooking === 'Upcoming' ? <AllUpcoming Bookings={UpcomingBookings} />
                    : selectedBooking === 'Cancelled' ? <AllCancelled Bookings={CancelledBookings} />
                        : <AllExpired Bookings={ExpiredBookings} />}

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