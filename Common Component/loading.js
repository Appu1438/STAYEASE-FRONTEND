import { View,ActivityIndicator,Text,Image, } from "react-native"
import { Styles } from "./Styles"


export default function Loading(){

    return(

        <View style={Styles.loading}>
            {/* <Image style={Styles.recomendationimage} source={require('../assets/logo1.png')}></Image> */}
            <Text style={Styles.loadingtext}>Loading....</Text>
            <ActivityIndicator color='black' style={{marginTop:10,}} size={50}/>

        </View>
    )
}