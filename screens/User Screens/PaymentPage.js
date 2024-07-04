import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Pressable, StatusBar, ActivityIndicator, Linking, Alert, StyleSheet, Modal } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../../../Api";
import Toast from "react-native-toast-message";
import { CardField, useConfirmPayment, useStripe } from "@stripe/stripe-react-native";
import getdata from "../../../Service/UserServices.js/Getdata";
import { useSelector } from "react-redux";
import createInvoice from "../../../Service/ConfirmationServices/DownloadInvoice";


export default function PaymentPage() {

    const route = useRoute();
    const navigation = useNavigation();

    const { total, bookingId } = route.params.data

    const [CardDetails, setCardDetails] = useState('');
    const UserData = useSelector(state => state.user.userData);

    const [Loading, setLoading] = useState(false);

    const { confirmPayment, loading } = useConfirmPayment()

  

 
    const fetchPaymentIntent = async () => {
        console.log('intent')
        const amount = total
        const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount }),
        });
        // console.log(response)
        const { clientSecret, error } = await response.json()
        return { clientSecret, error }

    }

    const handlePayment = async () => {
        // Check if card details are complete
        if (!CardDetails?.complete) {
            Toast.show({
                type: 'error',
                text1: 'Please enter card details',
                position: 'bottom',
            });
            return;
        }
        else{
        setLoading(true)


        // Prepare billing details
        const billingDetails = {
            email: UserData.email,
            name: UserData.name, // Assuming userData contains user's email
        };

        try {
            // Fetch payment intent client secret
            const { clientSecret, error } = await fetchPaymentIntent();

            if (error) {
                console.log('Unable to process payment')
            } else {

                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    paymentMethodType: 'Card',
                    paymentMethodData: {
                        billingDetails: billingDetails
                    }
                })

                if (paymentIntent) {
                    console.log(`payment success`)
                    Toast.show({
                        type:'success',
                        text1:'Payment Successfull',
                        position:'bottom',
                        visibilityTime:2000
                    })

                    UpdatePaymentStatus(paymentIntent)
                } else if (error) {
                    setLoading(false)
                    console.log(`payment confirmation error ${error}`)
                    Toast.show({
                        type:'error',
                        text1:'Payment Unsuccessfull',
                        position:'bottom',
                        visibilityTime:2000
                    })

                }
            }
        
        } catch (error) {
            console.error('Payment error:', error);
        }
    }
    };

    async function UpdatePaymentStatus(Intent) {
        console.log(Intent)
        const invoiceLink=await createInvoice(total,UserData)
        const data = {
            _id: bookingId,
            TotalAmount: total,
            PaymentDetails:[{
                paymentMethodId:Intent.id,
                amount:Intent.amount,
                currency:Intent.currency,
                clientSecret:Intent.clientSecret,
                invoice:invoiceLink

        }]

        }
        try {
            const response = await axios.post(`${API_BASE_URL}/update-payment-sts`, data)
            if (response.data.status == 'ok') {
                setLoading(false)
                navigation.navigate('Bookings')
                navigation.navigate('Confirmation', { data: bookingId })
            } else {
                navigation.navigate("Bookings", { data: UserData })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.heading}>StayEase</Text>
                    <Text style={styles.subHeading}>Secure Payments</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.paymentDetails}>Hotel Booking Payment</Text>
                    <Text style={styles.totalAmount}>Total: ₹{total}</Text>

                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{
                            number: "4242 4242 4242 4242",
                            cvc: "CVC",
                            expiry: "MM/YY",
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={styles.cardField}
                        onCardChange={(cardDetails) => { console.log(cardDetails) 
                            setCardDetails(cardDetails)}}
                    />
                </View>

                <TouchableOpacity style={styles.payButton} onPress={()=>{Loading?(null):(handlePayment())}} disabled={loading}>
                        {Loading ?
                         (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.payButtonText}>Pay Now</Text>
                        )}
                    </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light background for better contrast
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20, // Add padding for better layout
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10, // Increase curvature for a more modern look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Adjust shadow position slightly
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    header: {
        padding: 20,
        flexDirection: 'row', // Arrange heading and subheading horizontally
        justifyContent: 'space-between', // Align to opposite ends
        alignItems: 'center', // Center vertically within header
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    heading: {
        fontSize: 18,
        // fontWeight: '400',
        color: '#222', // Darker heading color for better contrast
    },
    subHeading: {
        fontSize: 14,
        color: '#666', // Muted color for subheading
    },
    content: {
        padding: 20,
    },
    paymentDetails: {
        fontSize: 15,
        marginBottom: 10,
        color: '#4CAF50', // Green for payment success indication
    },
    totalAmount: {
        fontSize: 15, // Increase total amount font size for better emphasis
        // fontWeight: 'bold',
        marginBottom: 20,
    },
    cardField: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#F2F2F2', // Light gray background for card input
        padding: 12, // Adjust padding for improved readability
        borderColor: '#CCC',
        borderWidth: 1,
    },
    payButton: {
        backgroundColor: '#4CAF50', // Maintain blue for primary action
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 8, // Rounded corners for a more polished look
        marginHorizontal: 20,
        marginBottom: 20,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
