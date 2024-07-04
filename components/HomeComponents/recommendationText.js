
import { View,Text } from "react-native"
import { Styles } from "../Common Component/Styles"



export default  function RecommendationsText(){
    return(
        <View style={Styles.recommendationTextContainer}>
        <Text style={Styles.recomendationText}>Recommendations for You</Text>
    </View>
    )
}

