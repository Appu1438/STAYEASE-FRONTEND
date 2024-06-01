import { View, Text, Image } from "react-native";
import { Styles } from "../Common Component/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';




export default function OrderDetails() {
    return (
        <View style={Styles.confirmboxthree}>

            <Text style={[Styles.detailText,]}>StayEase Al Ameen Hotel Cochin</Text>
            <Text style={[Styles.detailText, { color: 'grey', fontSize: 15 }]}>Ernakulam Town Railway Station , Kochi</Text>

            <View style={Styles.orderdetails}>

                <View style={Styles.box}>
                    <View style={[Styles.locationbox, { backgroundColor: 'grey' }]}>
                        <FontAwesomeIcon size={30} color="white" icon={faLocationDot} />
                    </View>
                    <Text style={Styles.boxtext}>Locaton</Text>
                </View>

                <View style={Styles.box}>
                    <View style={[Styles.locationbox, { backgroundColor: 'grey' }]}>
                        <Feather size={30} color='white' name="phone-call" />
                    </View>
                    <Text style={Styles.boxtext}>Call Hotel</Text>
                </View>

                <View>
                    <Image style={Styles.paymentimg} source={require('../assets/rooms.jpg')}></Image>
                </View>

            </View>

            <View style={Styles.checkingdetails}>

                <View style={[Styles.checkingbox,{height:75}]}>

                    <View>
                    <Text style={Styles.navtextone}>Check-in</Text>
                    <Text style={[Styles.navtextone,{fontWeight:"300"}]}>Mon 26 Feb</Text>
                    <Text style={[Styles.navtextone,{color:'grey'}]}>12pm onwards</Text>

                    </View>

                    <View>
                    <Text style={Styles.navtextone}>1N</Text>
                    </View>

                    <View>
                    <Text style={Styles.navtextone}>Check-out</Text>
                    <Text style={[Styles.navtextone,{fontWeight:"300"}]}>Mon 27 Feb</Text>
                    <Text style={[Styles.navtextone,{color:'grey'}]}>Before 11pm</Text>

                    </View>
                    
                </View>

                <View style={[Styles.checkingbox,]}>

                    <View>
                    <Text style={Styles.navtextone}>Reserved For</Text>
                    <Text style={[Styles.navtextone,{fontWeight:"300"}]}>Adithyan S Kumar</Text>
                    </View>

                    
                </View>

                <View style={[Styles.checkingbox,]}>

                    <View>
                    <Text style={Styles.navtextone}>Rooms & Guests</Text>
                    <Text style={[Styles.navtextone,{fontWeight:"300"}]}>1 Room . 1 Guest</Text>
                    </View>

                    
                </View>

                <View style={[Styles.checkingbox,]}>

                    <View>
                    <Text style={Styles.navtextone}>Contact Information</Text>
                    <Text style={[Styles.navtextone,{fontWeight:"300"}]}>+91 6238141438</Text>
                    </View>

                    
                </View>

            </View>


        </View>


    )
}