import { SafeAreaView } from "react-native";
import { Text, View, Image, Pressable, Modal } from "react-native";
import { Styles } from "../Common Component/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
// import Payment from "./payment";
import { useState } from "react";
import { ScrollView } from "react-native";

 export default function ShowBookings({ Modal }) {
    const navigation = useNavigation()
    return (
        
        <View>
            
            <View style={{ left: '5%', top: '5%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Bookings</Text>
            </View>

            <View style={Styles.bookingsBox}>
                <Pressable onPress={() => navigation.navigate('Detailview')}>
                    <View style={Styles.BookingboxContainer}>

                        <View style={Styles.bookingContainerboxes}>
                            <Image style={Styles.bookedimg} source={require('../assets/rooms.jpg')}></Image>
                        </View>

                        <View style={[Styles.bookingContainerboxes, { alignItems: 'flex-start' }]}>
                            <Text style={[Styles.detailText, { fontSize: 15, }]}>Kochi</Text>
                            <Text style={[Styles.detailText, { fontSize: 15, }]}>26 Feb - 27 Feb . 1 Guest</Text>
                            <Text style={[Styles.detailText, { color: 'grey', fontSize: 12}]}>StayEase Al Ameen Cochin,  Ernakulam Town Railway Station , Kochi</Text>


                        </View>

                    </View>

                </Pressable>



                <View style={Styles.bookingContainerboxesone}>

                    <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={Styles.box}>
                            <View style={[Styles.bookingHoteldetails,]}>
                                <FontAwesomeIcon size={30} color="white" icon={faLocationDot} />
                            </View>
                            <Text style={Styles.boxtext}>Locaton</Text>
                        </View>

                        <View style={Styles.box}>
                            <View style={[Styles.bookingHoteldetails,]}>
                                <Feather size={30} color='white' name="phone-call" />
                            </View>
                            <Text style={Styles.boxtext}>Call Hotel</Text>
                        </View>

                    </View>
                    <View style={Styles.box}>
                        <Text style={[Styles.detailText, { fontSize: 18, }]}>Total:722</Text>

                    </View>


                </View>
                <View style={Styles.bookingContainerboxlast}>

                    <Pressable style={[Styles.btn, { marginTop: 0 }]} onPress={() => Modal(true)}>
                        <Text style={Styles.btntext} >Pay Now</Text>
                    </Pressable>

                </View>


            </View>
         </View>

    )

}