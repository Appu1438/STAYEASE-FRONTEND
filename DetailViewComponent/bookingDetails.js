import { Pressable, ScrollView, Text, View } from "react-native"
import { Styles } from "../Common Component/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCalendarDays, faUserGroup, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import DatePicker from "react-native-datepicker"





export default function BookingDetails() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <ScrollView>
            <Text style={[Styles.detailText,{marginTop:0}]}>Your Booking Details</Text>

            <View style={Styles.bookingboxContainer}>
                <View style={Styles.bookingbox}>

                    <View style={[Styles.bookingboxes, {}]}>

                        <FontAwesomeIcon size={20} icon={faCalendarDays} />
                        <FontAwesomeIcon size={20} icon={faUserGroup} />
                        <FontAwesomeIcon size={20} icon={faUser} />

                    </View>

                    <View style={[Styles.bookingboxes, { width: '26%', }]}>
                        <Text style={Styles.bookingtext}>Dates</Text>
                        <Text style={Styles.bookingtext}>Guests</Text>
                        <Text style={Styles.bookingtext}>Booking For</Text>


                    </View>

                    <View style={[Styles.bookingboxes, { width: '64%', backgroundColor: 're' }]}>
                        <Text style={Styles.bookingLasttext}>Mon 26 Feb-Tue 27 Feb</Text>
                        <Text style={Styles.bookingLasttext}>1 Room . 1 Guest</Text>
                        <Text style={Styles.bookingLasttext}>Adithyan</Text>

                    </View>
                  

                </View>
            </View>
        </ScrollView>
    )
} 