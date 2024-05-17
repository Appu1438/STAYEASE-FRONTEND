import Toast from "react-native-toast-message";
import { incrementGuest } from "../../Redux/Guests";


const handleIncGuests = (Hoteldata,Guests,Rooms,ExtraAmount,setExtraAmount,Total,setTotal,dispatch) => {
    console.log('plus')
    const limit = Rooms * parseInt(Hoteldata.personsperroom)
    if (Guests < limit) {
        dispatch(incrementGuest())
        setExtraAmount(ExtraAmount + parseInt(Hoteldata.extraperhead))
        setTotal(Total + parseInt(Hoteldata.extraperhead))

    } else {
        Toast.show({
            type: 'error',
            text1: `Max Persons in ${Rooms} Room is ${limit}`,
            visibilityTime: 2000,
            position: 'bottom'
        });
    }
}

export default handleIncGuests