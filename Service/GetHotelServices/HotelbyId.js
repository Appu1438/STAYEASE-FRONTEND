import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";


async function gethotelDetails(hotelId,setHotelData,setBaseAmount,setTotal) {
    try {
        await axios.get(`${API_BASE_URL}/get-hotel-byID?id=${hotelId}`).then(res => {
            console.log(res.data.data)
            if (res.data.status == 'ok') {
                setHotelData(res.data.data)
                setBaseAmount?setBaseAmount(parseInt(res.data.data.discountedrate)):null
                setTotal?setTotal(parseInt(res.data.data.discountedrate)):null

            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        })
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: JSON.stringify(err),
            visibilityTime: 3000,
            position: 'bottom'
        });
    }

}

export default gethotelDetails