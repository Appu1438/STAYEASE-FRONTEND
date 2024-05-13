import { Linking } from "react-native";


const OpenDial = (phoneNumber) => {
     // Replace with your phone number
    const dialerUrl = `tel:+91${phoneNumber}`;

    Linking.openURL(dialerUrl);
}

export default OpenDial