import { Linking } from "react-native";



const OpenMaps = (Link) => {
    console.log('Maps')
    Linking.openURL(Link);

}

export default OpenMaps
