import { ScrollView, View, Image, Text, useWindowDimensions, Pressable } from "react-native"
import { Styles } from "../Common Component/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"





export default function Moreimages() {
    let windowwidth = useWindowDimensions().width
    return (

        <ScrollView>

            <View>
                <Pressable onPress={() => console.log('Fav Pressesd')} style={[Styles.favourite]}>

                    <FontAwesomeIcon size={25} icon={faHeart} />

                </Pressable>
            </View>

            <ScrollView horizontal style={{ backgroundColor: 'red', }}>

                <View style={Styles.detailViewImgBox}>

                    <View >
                        <Image style={[Styles.detailimg, { width: windowwidth }]} source={require('../assets/rooms.jpg')}></Image>
                    </View>

                    <View >
                        <Image style={[Styles.detailimg, { width: windowwidth }]} source={require('../assets/rooms1.jpg')}></Image>
                    </View>

                    <View >
                        <Image style={[Styles.detailimg, { width: windowwidth }]} source={require('../assets/rooms2.jpg')}></Image>
                    </View>

                    <View >
                        <Image style={[Styles.detailimg, { width: windowwidth }]} source={require('../assets/rooms3.jpg')}></Image>
                    </View>

                </View>

            </ScrollView>
        </ScrollView>



    )
}