import { SafeAreaView } from "react-native";
import { Text, View, Image, Pressable, Modal } from "react-native";
import { Styles } from "../Common Component/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import Payment from "./payment";
import { useState } from "react";
import { ScrollView } from "react-native";
import ShowBookings from "../ViewBookingComponent/ShowBookings";

export default function Bookings() {
    const navigation = useNavigation()
    const [modalVisible, setmodalVisible] = useState(false)

    return (

        <SafeAreaView style={Styles.bookingContainer}>
           
           <ShowBookings Modal={setmodalVisible}/>
            

            <Modal visible={modalVisible} presentationStyle="pageSheet" animationType="slide">

                <Payment visibility={setmodalVisible} />

            </Modal>

        </SafeAreaView>
    )
}