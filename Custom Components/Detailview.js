import { View,StatusBar, Text, ScrollView, SafeAreaView, Image,Modal,StyleSheet,TouchableOpacity} from "react-native";
import { Styles } from "../Common Component/Styles";
import Moreimages from "../DetailViewComponent/Moreimage";
import OtherDetails from "../DetailViewComponent/OtherDetails";
import BookingDetails from "../DetailViewComponent/bookingDetails";
import Bookingfooter from "../DetailViewComponent/Book";
import RecommendationsText from "../HomeComponents/recommendationText";
import RecommendationsOne from "../HomeComponents/recommendationsOne";
import RecommendationsTwo from "../HomeComponents/recommendationsTwo";
import { useEffect, useState } from "react";
import Loading from "../Common Component/loading";
import Payment from "./payment";
import Bookings from "./ViewBooking";



export default function Detailview({  }) {
   
    const [isLoading,setloading]=useState(true)
    const [modalVisible, setmodalVisible]=useState(false)

    useEffect(()=>{
        setTimeout(() => {
            setloading(false)
        }, 1000);
    })

    if(isLoading){
        return(
            <Loading/>
        )
    }else{

    


    return (
        <SafeAreaView style={[Styles.container, { alignItems: 'flex-start' }]}>
                   <StatusBar style="auto"/>

            <ScrollView style={{}}>

                <Moreimages />
                <OtherDetails/>
                <BookingDetails/> 
                <RecommendationsText/>
                <RecommendationsOne/>
                <RecommendationsTwo/>
            </ScrollView>

            <Bookingfooter payment={setmodalVisible} />

            <Modal visible={modalVisible} presentationStyle="pageSheet"  animationType="slide">

                   <Payment visibility={setmodalVisible} />
           
                </Modal>

        </SafeAreaView>


       

    )
    }
}
