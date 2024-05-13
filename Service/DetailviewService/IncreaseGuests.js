import Toast from "react-native-toast-message";


const handleIncGuests = (Hoteldata,Guests,setGuests,Rooms,ExtraAmount,setExtraAmount,Total,setTotal) => {
    console.log('plus')
    const limit = Rooms * parseInt(Hoteldata.personsperroom)
    if (Guests < limit) {
        setGuests(Guests + 1)
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