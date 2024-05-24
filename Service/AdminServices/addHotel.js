import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";

const AddHotel=async(Hoteldata,navigation)=>{
    await axios.post(`${API_BASE_URL}/add-hotel`, Hoteldata).then(res => {
        console.log(res.data)
        if (res.data.status == 'ok') {
            Toast.show({
                type: 'success',
                text1: JSON.stringify(res.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
            navigation.navigate('Home')
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(res.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
        }
    }).catch(err => {
        Toast.show({
            type: 'error',
            text1: 'Unknown Error Occured',
            visibilityTime: 3000,
            position: 'bottom'
        })
    })
}

export default AddHotel