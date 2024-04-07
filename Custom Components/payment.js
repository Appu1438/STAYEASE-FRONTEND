import { View, Text, ScrollView, SafeAreaView ,Modal,StatusBar} from "react-native";
import { Styles } from "../Common Component/Styles";
import Confirm from "../PaymentComponents/Confirm";
import PayOnline from "../PaymentComponents/Payonline";
import OrderDetails from "../PaymentComponents/OrderDetails";
import ImporatToNote from "../PaymentComponents/Payment footer";
ImporatToNote



export default function Payment({visibility}) {

    return (


        <SafeAreaView style={{flex:1}}>


            <ScrollView >

                <Confirm modalchange={visibility} />
                <PayOnline/>
                <OrderDetails/>

            </ScrollView>

            <ImporatToNote/>

        </SafeAreaView>
    )
}