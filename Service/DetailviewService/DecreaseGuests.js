import Toast from "react-native-toast-message";
import { decrementGuest } from "../../Redux/Guests";

const handleDecGuests = (Hoteldata,Guests,ExtraAmount,setExtraAmount,Total,setTotal,dispatch) => {
    console.log('minus')
    if (Guests != 1) {
        dispatch(decrementGuest())
        setExtraAmount(ExtraAmount - parseInt(Hoteldata.extraperhead))
        setTotal(Total - parseInt(Hoteldata.extraperhead))

    } else {
        Toast.show({
            type: 'error',
            text1: 'Minimum One Person',
            visibilityTime: 2000,
            position: 'bottom'
        });
    }
}

export default handleDecGuests