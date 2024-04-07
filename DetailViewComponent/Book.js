import { View, Text, Pressable } from "react-native";
import { Styles } from "../Common Component/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Bookingfooter({ payment }) {
    const navigation = useNavigation()
    const [isBooked, setIsBooked] = useState(false)

    return (
        <View style={Styles.bookingfooter}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesomeIcon style={{ marginTop: 5, left: 0 }} size={20} icon={faIndianRupeeSign} />
                    <Text style={[Styles.bookingtext,{fontSize: 15}]}>722</Text>
                    <Text style={[Styles.bookingtext, { textDecorationLine: 'line-through', fontSize: 10, top: 5, left: 0 }]}>3367</Text>
                </View>
                <View>
                    <Text style={[Styles.bookingtext, { color: '#016DD0', fontSize: 10, top: 0, left: 0 }]}>+127 taxes and fees</Text>
                </View>
            </View>
            <View>
                <Pressable style={Styles.bookingbtn} onPress={() => {
                  if(!isBooked){
                    payment(true)
                    setIsBooked(true)
                  }else{
                    navigation.navigate('Bookings')
                  }
                }}>
                    <Text style={Styles.bookingbtntext}>
                        {isBooked ? "Go to the Bookings" : "Book Now & Pay At Hotel"}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
