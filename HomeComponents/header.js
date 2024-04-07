
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View,Text,Pressable,TextInput } from "react-native"
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Styles } from "../Common Component/Styles";
import Location from "./location";
Location



export default function Homeheader({Navbar}){
    return(
        <View style={[Styles.homeheader,]}>


        <View style={Styles.bar}>

            <Pressable onPress={() =>Navbar(true)}>
                <FontAwesomeIcon size={30} icon={faBars} />
            </Pressable>
        </View>

        <Text style={Styles.appname}>STAYEASE</Text>
        <Pressable style={Styles.search} >
            <FontAwesomeIcon size={20} style={{ }} icon={faSearch} />
            <TextInput style={Styles.searchinput} placeholder="Search Nearby Hotels"></TextInput>
        </Pressable>



    </View>

    )
}