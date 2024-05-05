
import { View,Text,TouchableOpacity ,StyleSheet} from "react-native"
import { Styles } from "../Common Component/Styles"
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Confirm({}){

    return(

        <View style={Styles.confirmbox}>
              <TouchableOpacity style={{top:"20%"}}>
                <AntDesign name="closecircleo" size={20} color='white'/>
            </TouchableOpacity>
            <Text  style={[Styles.confirmtext,{top:'25%'}]}>Your booking is confirmed</Text>
          
        </View>
        
    )
}