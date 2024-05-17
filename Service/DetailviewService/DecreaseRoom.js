import Toast from "react-native-toast-message";
import { decrementRooms } from "../../Redux/Rooms";

const handleDecRoom = (Rooms, Hoteldata, setExtraAmount, setTotal, ExtraAmount, Total,dispatch) => {
    console.log('minus')
    if (Rooms != 1) {
        dispatch(decrementRooms())     
        setExtraAmount(ExtraAmount - parseInt(Hoteldata.extraperroom))
        setTotal(Total - parseInt(Hoteldata.extraperroom))
    } else {
        Toast.show({
            type: 'error',
            text1: 'Minimum One Room',
            visibilityTime: 2000,
            position: 'bottom'
        });
    }


}

export default handleDecRoom