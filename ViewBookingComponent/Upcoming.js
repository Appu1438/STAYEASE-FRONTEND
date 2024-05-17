import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Modal, StyleSheet, TouchableOpacity, useWindowDimensions, ActivityIndicator, FlatList } from "react-native";
import { Styles } from "../Common Component/Styles";

import { useEffect, useState } from "react";
import Loading from "../Common Component/loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";

export default function Upcoming({Bookings}){

  
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);
    const [Showloading, setShowLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setShowLoading(false)
        }, 2000);
    })

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Handle invalid date string
            return 'Invalid Date';
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };


    const renderBookingCard = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Hotel Name:</Text>
                        <Text style={styles.value}>   {item.hotelName}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Booking ID:</Text>
                        <Text style={styles.value}>{item.BookingId}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Booked Time:</Text>
                        <Text style={styles.value}>{formatDate(item.BookedAt)}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Check-In:</Text>
                        <Text style={styles.value}>{formatDate(item.CheckIn)}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Check-Out:</Text>
                        <Text style={styles.value}>{formatDate(item.CheckOut)}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Rooms:</Text>
                        <Text style={styles.value}>{item.Rooms}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Guests:</Text>
                        <Text style={styles.value}>{item.Guests}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Total Amount:</Text>
                        <Text style={styles.value}>{item.TotalAmount}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Payment Status:</Text>
                        <Text style={styles.value}>{item.PaymentStatus}</Text>
                    </View>
                    {item.PaymentStatus=='paid'?(<View style={styles.header}>
                        <Text style={styles.heading}>Amount Paid:</Text>
                        <Text style={styles.value}>{item.PaidAmount}</Text>
                    </View>):(null)}
                    <TouchableOpacity style={styles.button} onPress={() => {
                        {
                            loading ? null : setLoading(true)
                            navigation.navigate('Confirmation', { data: item._id })
                        }
                        setLoading(false)
                    }}>
                        {loading ? <ActivityIndicator color='white' /> :
                            (<Text style={styles.buttonText}>View Booking</Text>)}
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    return (
        <>
            {Showloading ? (
                <ActivityIndicator color='black' size={40} />
            ) : (
                <>
                    {Bookings.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>No Bookings Found</Text>
                        </View>
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={Bookings.reverse()} // Use Bookings instead of BookingDetails
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={renderBookingCard}
                        />
                    )}
                </>
            )}
        </>
    );
    
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: 330,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: 'grey'
    },
    content: {
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
    },
    button: {
        backgroundColor: '#f73939',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
