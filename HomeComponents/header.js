
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View,Text,Pressable,TextInput, TouchableOpacity } from "react-native"
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Styles } from "../Common Component/Styles";
import Location from "./location";
import { useNavigation } from "@react-navigation/native";




export default function Homeheader({Navbar,User}){

    const navigation=useNavigation()
    return(
        <View style={[Styles.homeheader,]}>


        <View style={Styles.bar}>

            <Pressable onPress={() =>Navbar(true)}>
                <FontAwesomeIcon size={30} icon={faBars} />
            </Pressable>
        </View>

        <Text style={Styles.appname}>STAYEASE</Text>
        <TouchableOpacity style={Styles.search} onPress={()=>navigation.navigate("Search",{data:null})}>
            <FontAwesomeIcon size={15} style={{ position:'absolute',alignSelf:'flex-start',left:'5%'}} icon={faSearch} />
            <Text style={Styles.searchinput} placeholder="Search Nearby Hotels">Search Nearby Hotels</Text>
        </TouchableOpacity>



    </View>

    )
}