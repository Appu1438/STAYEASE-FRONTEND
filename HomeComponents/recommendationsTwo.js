
import { View, Text, Pressable, TouchableOpacity, ScrollView, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faStar, } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Styles } from '../Common Component/Styles';








export default function RecommendationsTwo() {

    const navigation = useNavigation()


    return (



        <ScrollView horizontal style={{ backgroundColor: '', maxHeight: 370, backgroundColor: "pum" }}>

            <View style={Styles.recomendationContent}>

                <TouchableOpacity onPress={() => navigation.navigate('Detailview')}>

                    <View style={Styles.recomendationContentBox} >

                        <Pressable onPress={() => console.log('Fav Pressesd')} style={Styles.favourite}>

                            <FontAwesomeIcon size={25} icon={faHeart} />

                        </Pressable>


                        <Image style={Styles.recomendationimage} source={require('../assets/rooms.jpg')}></Image>

                        <View style={Styles.rating}>
                            <FontAwesomeIcon style={{ paddingTop: 30 }} color="red" icon={faStar} size={30} />
                            <Text style={[Styles.ratingText, { top: 5 }]}> 3.9 (60)</Text>
                        </View>

                        <View>
                            <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>StayEase Al Ameen Hotel Cochin</Text>
                        </View>

                        <View style={{ flexDirection: 'row', top: 15 }}>
                            <FontAwesomeIcon style={{ marginTop: 10, left: 5 }} size={20} icon={faIndianRupeeSign} />
                            <Text style={Styles.pricetext}>722</Text>
                            <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 15, top: 5, left: 10 }]}>3367</Text>
                            <Text style={[Styles.pricetext, { color: 'green', fontSize: 15, top: 5, left: 15 }]}>74% Off</Text>
                        </View>

                        <View>
                            <Text style={[Styles.pricetext, { color: 'grey', fontSize: 15, top: 15, left: 15 }]}>+127 taxes and fees</Text>
                        </View>


                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Detailview')}>

                    <View style={Styles.recomendationContentBox} >

                        <Pressable onPress={() => console.log('Fav Pressesd')} style={Styles.favourite}>

                            <FontAwesomeIcon size={25} icon={faHeart} />

                        </Pressable>


                        <Image style={Styles.recomendationimage} source={require('../assets/rooms.jpg')}></Image>

                        <View style={Styles.rating}>
                            <FontAwesomeIcon style={{ paddingTop: 30 }} color="red" icon={faStar} size={30} />
                            <Text style={[Styles.ratingText, { top: 5 }]}> 3.9 (60)</Text>
                        </View>

                        <View>
                            <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>StayEase Al Ameen Hotel Cochin</Text>
                        </View>

                        <View style={{ flexDirection: 'row', top: 15 }}>
                            <FontAwesomeIcon style={{ marginTop: 10, left: 5 }} size={20} icon={faIndianRupeeSign} />
                            <Text style={Styles.pricetext}>722</Text>
                            <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 15, top: 5, left: 10 }]}>3367</Text>
                            <Text style={[Styles.pricetext, { color: 'green', fontSize: 15, top: 5, left: 15 }]}>74% Off</Text>
                        </View>

                        <View>
                            <Text style={[Styles.pricetext, { color: 'grey', fontSize: 15, top: 15, left: 15 }]}>+127 taxes and fees</Text>
                        </View>


                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Detailview')}>

                    <View style={Styles.recomendationContentBox} >

                        <Pressable onPress={() => console.log('Fav Pressesd')} style={Styles.favourite}>

                            <FontAwesomeIcon size={25} icon={faHeart} />

                        </Pressable>


                        <Image style={Styles.recomendationimage} source={require('../assets/rooms.jpg')}></Image>

                        <View style={Styles.rating}>
                            <FontAwesomeIcon style={{ paddingTop: 30 }} color="red" icon={faStar} size={30} />
                            <Text style={[Styles.ratingText, { top: 5 }]}> 3.9 (60)</Text>
                        </View>

                        <View>
                            <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>StayEase Al Ameen Hotel Cochin</Text>
                        </View>

                        <View style={{ flexDirection: 'row', top: 15 }}>
                            <FontAwesomeIcon style={{ marginTop: 10, left: 5 }} size={20} icon={faIndianRupeeSign} />
                            <Text style={Styles.pricetext}>722</Text>
                            <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 15, top: 5, left: 10 }]}>3367</Text>
                            <Text style={[Styles.pricetext, { color: 'green', fontSize: 15, top: 5, left: 15 }]}>74% Off</Text>
                        </View>

                        <View>
                            <Text style={[Styles.pricetext, { color: 'grey', fontSize: 15, top: 15, left: 15 }]}>+127 taxes and fees</Text>
                        </View>


                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Detailview')}>

                    <View style={Styles.recomendationContentBox} >

                        <Pressable onPress={() => console.log('Fav Pressesd')} style={Styles.favourite}>

                            <FontAwesomeIcon size={25} icon={faHeart} />

                        </Pressable>


                        <Image style={Styles.recomendationimage} source={require('../assets/rooms.jpg')}></Image>

                        <View style={Styles.rating}>
                            <FontAwesomeIcon style={{ paddingTop: 30 }} color="red" icon={faStar} size={30} />
                            <Text style={[Styles.ratingText, { top: 5 }]}> 3.9 (60)</Text>
                        </View>

                        <View>
                            <Text style={[Styles.ratingText, { left: '2%', top: 10 }]}>StayEase Al Ameen Hotel Cochin</Text>
                        </View>

                        <View style={{ flexDirection: 'row', top: 15 }}>
                            <FontAwesomeIcon style={{ marginTop: 10, left: 5 }} size={20} icon={faIndianRupeeSign} />
                            <Text style={Styles.pricetext}>722</Text>
                            <Text style={[Styles.pricetext, { textDecorationLine: 'line-through', fontSize: 15, top: 5, left: 10 }]}>3367</Text>
                            <Text style={[Styles.pricetext, { color: 'green', fontSize: 15, top: 5, left: 15 }]}>74% Off</Text>
                        </View>

                        <View>
                            <Text style={[Styles.pricetext, { color: 'grey', fontSize: 15, top: 15, left: 15 }]}>+127 taxes and fees</Text>
                        </View>


                    </View>
                </TouchableOpacity>

            </View >

        </ScrollView>
    )
}