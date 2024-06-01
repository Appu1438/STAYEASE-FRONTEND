import { View, Text } from "react-native";
import { Styles } from "../Common Component/Styles";
import Feather from 'react-native-vector-icons/Feather';




export default function ImporatToNote() {

    return (

        <View style={Styles.CheckingFooter}>

            <Text style={[Styles.detailText,]}>Important to Note</Text>

            <View style={Styles.footercontent}>

                <View  style={{flexDirection:"row",}}>
                    <Feather style={{ top: '5%' }} name="key" size={30} />

                <View>
                    <Text style={Styles.navtextone}>Check-in</Text>
                    <Text style={[Styles.navtextone, { color: 'grey' }]}>12:00PM </Text>
                </View>

                </View>


                <View >
                    <Text style={Styles.navtextone}>Check-out</Text>
                    <Text style={[Styles.navtextone, { color: 'grey' }]}>Till 11PM</Text>
                </View>

            </View>
        </View>
    )
}