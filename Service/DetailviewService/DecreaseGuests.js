import Toast from "react-native-toast-message";

const handleDecGuests = (Hoteldata,Guests,setGuests,ExtraAmount,setExtraAmount,Total,setTotal) => {
    console.log('minus')
    if (Guests != 1) {
        setGuests(Guests - 1)
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