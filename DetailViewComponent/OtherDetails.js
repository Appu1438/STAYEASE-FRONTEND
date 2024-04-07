
import { ScrollView, Text, View } from "react-native"
import { Styles } from "../Common Component/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faUserGroup, faSquareParking, faBowlFood } from "@fortawesome/free-solid-svg-icons"



export default function OtherDetails() {
    return (
        <ScrollView  >

            <View style={{  height: 270 }}>

                <Text style={[Styles.detailText,]}>StayEase Al Ameen Hotel Cochin</Text>

                <View style={{ flexDirection: 'row', left: '4%' }}>
                    <FontAwesomeIcon style={{ paddingTop: 40 }} color="red" icon={faStar} size={20} />
                    <Text style={[Styles.detailText]}> 3.9 (60 Ratings)</Text>
                    <Text style={[Styles.detailText, { color: '#016DD0', fontSize: 15, padding: 2 }]}>See Reviews</Text>

                </View>

                <Text style={[Styles.detailText, { color: 'grey', fontSize: 15,marginTop:0 }]}>Ernakulam Town Railway Station , Kochi</Text>
                <Text style={[Styles.detailText, { color: '#016DD0', fontSize: 13,}]}>View on Map</Text>
                <Text style={[Styles.detailText, { fontSize: 15,}]}>Why Book this?</Text>

                <View  style={Styles.features}>
                    <FontAwesomeIcon style={{ paddingTop: 30 }} color="#F20493" icon={faUserGroup} size={20} />
                    <Text style={Styles.featurestext}>All are Welcome</Text>
                </View>

                <View style={Styles.features}>
                    <FontAwesomeIcon style={{ paddingTop: 30 }} color="#F20493" icon={faSquareParking} size={20} />
                    <Text style={Styles.featurestext}>Safe Parking Facility</Text>
                </View>

                <View style={Styles.features}>
                    <FontAwesomeIcon style={{ paddingTop: 30 }} color="#F20493" icon={faBowlFood} size={20} />
                    <Text style={Styles.featurestext}>Food Options Available</Text>
                </View>







            </View>

        </ScrollView>
    )
}