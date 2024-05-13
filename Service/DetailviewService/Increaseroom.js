import Toast from "react-native-toast-message";

const handleIncRoom = (Rooms,Hoteldata,setRooms,setExtraAmount,setTotal,ExtraAmount,Total) => {
    console.log('plus')
    if (Rooms != parseInt(Hoteldata.availablerooms)) {
        setRooms(Rooms + 1)
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