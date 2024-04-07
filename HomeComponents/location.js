
import { View , ScrollView,Text,Image,} from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Styles } from "../Common Component/Styles"
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";



export default function Location(){
    return(
        <ScrollView style={{ backgroundColor: '', maxHeight: 130 }} horizontal >

        <View style={Styles.locationContainer}>

            <View style={Styles.box}>
                <View style={[Styles.locationbox, { backgroundColor: '#0d0d0c' }]}>
                    <FontAwesomeIcon size={30} color="white" icon={faLocationDot} />
                </View>
                <Text style={Styles.boxtext}>Nearby</Text>
            </View>

            <View style={Styles.box}>
                <View style={Styles.locationbox}>
                    <Image style={Styles.locationimg} source={require("../assets/licensed-image.jpg")}></Image>
                </View>
                <Text style={Styles.boxtext}>Banglore</Text>
            </View>

            <View style={Styles.box}>
                <View style={Styles.locationbox}>
                    <Image style={[Styles.locationimg, { marginTop: 0 }]} source={require("../assets/agra2.jpg")}></Image>
                </View>
                <Text style={[Styles.boxtext, {}]}>Agra</Text>
            </View>

            <View style={Styles.box}>
                <View style={Styles.locationbox}>
                    <Image style={Styles.locationimg} source={require("../assets/hyderbad.jpg")}></Image>
                </View>
                <Text style={Styles.boxtext}>Hyderbad</Text>
            </View>

            <View style={[Styles.box,]}>
                <View style={Styles.locationbox}>
                    <Image style={Styles.locationimg} source={require("../assets/madgaon.jpg")}></Image>
                </View>
                <Text style={Styles.boxtext}>Madgaon</Text>
            </View>

            <View style={[Styles.box, {}]}>
                <View style={Styles.locationbox}>
                    <Image style={Styles.locationimg} source={require("../assets/mumbai.jpg")}></Image>
                </View>
                <Text style={Styles.boxtext}>Mumbai</Text>
            </View>

            <View style={[Styles.box, {}]}>
                <View style={Styles.locationbox}>
                    <Image style={Styles.locationimg} source={require("../assets/gurgaon.jpeg")}></Image>
                </View>
                <Text style={Styles.boxtext}>Gurgaon</Text>
            </View>


        </View>

    </ScrollView>

    )
}