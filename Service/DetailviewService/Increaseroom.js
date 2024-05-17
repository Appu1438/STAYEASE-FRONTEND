import Toast from "react-native-toast-message";
import { incrementRooms } from "../../Redux/Rooms";



const handleIncRoom = (Rooms,Hoteldata,setExtraAmount,setTotal,ExtraAmount,Total,dispatch) => {

    console.log('plus')
    if (Rooms != parseInt(Hoteldata.availablerooms)) {
        dispatch(incrementRooms())
        setExtraAmount(ExtraAmount + parseInt(Hoteldata.extraperroom))
        setTotal(Total + parseInt(Hoteldata.extraperroom))
    } else {
        Toast.show({
            type: 'error',
            text1: `Currently Only ${Rooms} Rooms Available`,
            visibilityTime: 2000,
            position: 'bottom'
        });
    }
}

export default handleIncRoom