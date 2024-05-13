import Toast from "react-native-toast-message";

const handleDecRoom = (Rooms,Hoteldata,setRooms,setExtraAmount,setTotal,ExtraAmount,Total) => {
    console.log('minus')
    if (Rooms != 1) {
        setRooms(Rooms - 1)
        setExtraAmount(ExtraAmount - parseInt(Hoteldata.extraperroom))
        setTotal(Total - parseInt(Hoteldata.extraperroom))
        // setGuests(parseInt(Hoteldata.personsperroom) * Rooms)


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