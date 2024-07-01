
import { StyleSheet, Platform, useWindowDimensions } from "react-native"


export let Styles = StyleSheet.create({


    container: {
        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center',
        marginTop: 0,
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: -20,
        fontStyle: 'normal'
    },
    text2: {
        color: 'black',
        fontSize: 20,
        marginTop: 10,
        fontStyle: 'normal'
    },
    loginimg: {
        width: 300,
        height: 300,
        marginTop: 10
    },
    signinimg: {
        width: 180,
        height: 180,
        marginTop: 0
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        top: 10
    },
    btn: {
        width: 300,
        height: 50,
        backgroundColor: '#f73939',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 5
    },
    btntext: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },

    homeheader: {
        flexDirection: 'column',
        marginTop: 0,
        width: '100%',
        height: 135,
        backgroundColor:'#f8f8f8',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bar:
        { alignSelf: 'flex-start', left: 15, justifyContent: 'center', top: 35 },

    appname: {
        fontWeight: "bold",
        fontSize: 30,
        color: '#f73939',
        // paddingLeft:70
    },
    search: {
        width: '90%',
        height: 45,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        // flexDirection: 'row',
        // paddingLeft: 0,
        // elevation:5,
        // shadowColor:'blue',
        // height: 50,
        backgroundColor: '#dededede',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        shadowColor: '#39a8db',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 10,

    },
    searchinput: {
        width: '80%',
        borderWidth: 0,
        textAlign: 'center',
        fontSize: 15,
        
    },
    locationContainer: {
        flexDirection: 'row',
        overflow: 'scroll',
        justifyContent: 'space-evenly',
        marginTop: 0,
        width: '100%',
        height: 120,
        paddingRight: 10

    },

    locationbox: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 0,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'plum',

    },
    box: {
        justifyContent: "center",
        alignItems: 'center',
        marginLeft: 10
    },
    boxtext: {
        fontSize: 15,
        fontWeight: 'normal',
        marginLeft: 0
    },
    locationimg: {
        width: 80,
        height: 80
    },

    recomendationText: {
        marginTop: 20,
        marginLeft: 16,
        fontSize: 20,
        fontWeight: 'normal',
    },
    recomendationContent: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        overflow: 'scroll',
        width: '100%',
        height: 500,
        //  backgroundColor:'red',
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,


    },
    recomendationContentBox: {
        width: 300,
        height: 300,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 0.9,
        borderColor: '#000000',
        overflow: 'hidden',

    },
    recomendationimage: {
        width: '100%',
        height: 180,
        objectFit: 'cover',
        marginTop: -15

    },
    favourite: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        borderRadius: 50,
        alignSelf: 'flex-end',
        right: 10,
        top: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }, boxdetails: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    rating: {
        left: '2%',
        top: '2%',
        flexDirection: 'row'
    },
    ratingText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 0,
        fontStyle: 'normal'
    },
    pricetext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 5,
        left: 5,
        fontStyle: 'normal'
    },
    footer: {
        width: '100%',
        height: 60,
        // backgroundColor:'plum',
        alignItems: 'flex-start',
        paddingLeft: '5%',
        paddingTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    footerbox: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'yellow',

    },
    footertext: {
        fontSize: 12,
        fontWeight: 'normal',
        marginLeft: 0
    },
    detailViewImgBox: {
        width: '100%',
        height: 280,
        flexDirection: "row",
        overflow: 'scroll',
        justifyContent: 'flex-start',
        backgroundColor: 'yellow',




    },
    detailimg: {
        height: '100%',
        resizeMode: 'cover',

    },
    detailText: {
        color: 'black',
        // fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        fontStyle: 'normal',
        left: '4%'
    },
    features: { flexDirection: 'row', left: '5%', marginTop: 5 },
    featurestext: {
        // fontWeight: 'bold',
        marginTop: 10,
        fontStyle: 'normal',
        left: '5%',
        color: '#F20493',
        fontSize: 15,
        padding: 5,
        marginTop: 0
    },
    bookingboxContainer: {
        width: '100%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        top: 10
        // backgroundColor:'yellow'
    },
    bookingbox: {
        width: '90%',
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        flexDirection: 'row'

    },
    selectionbox:
    {
        flexDirection: 'row',
        height: 25,
        alignSelf: 'flex-end',
        right: '15%',
        borderWidth: 1,
        borderRadius: 5,
        width: 65,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    bookingtext: {
        fontSize: 13,
        paddingLeft: 5
    },
    bookingboxes: {
        width: '10%',
        backgroundColor: "blck",
        height: '100%',
        justifyContent: 'space-evenly',
        left: '5%'
    },
    bookingLasttext: {
        color: '#016DD0',
        fontSize: 12,
        paddingLeft: 5,
        alignSelf: 'flex-end',
        right: '15%',

    },
    bookingfooter: {
        width: '100%',
        height: 60,
        // backgroundColor:'plum',
        alignItems: 'center',
        paddingLeft: '0%',
        paddingTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        elevation: 5,
    },
    bookingbtn: {

        width: 180,
        height: 40,
        backgroundColor: '#f73939',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        borderRadius: 10,
        elevation: 5
    },
    bookingbtntext: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    navbar: {
        width: '70%',
        height: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,

    },
    loading: {
        flex: 1,
        backgroundColor: "#ffff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingtext: {
        fontSize: 20,
        color: 'black'
    },
    close: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: '1%',
        right: '2%'
    },
    navone: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        top: '10%'
    },
    navtextone: {
        fontSize: 13,
        fontWeight: 'bold',
        // left:10

    },
    navtexttwo: {
        fontSize: 13,
        color: 'grey',
        left: 10
    },
    profilecontainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 0,
        alignItems: 'center'
    },
    profile: {
        color: "black",
        fontSize: 20,
        fontWeight: 'bold',

    },
    profilebox: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        // top: '10%',
        marginTop: '5%'
    },
    confirmboxg: {
        width: '100%',
        height: 120,
        backgroundColor: '#347442',
        justifyContent: 'flex-start',
        paddingLeft: '5%',
        alignItems: 'flex-start',
        // paddingTop:'5%'
    },
    confirmboxy: {
        width: '100%',
        height: 120,
        backgroundColor: '#dbc607',
        justifyContent: 'flex-start',
        paddingLeft: '5%',
        alignItems: 'flex-start',
        // paddingTop:'5%'
    },
    confirmtext: {
        color: 'white',
        fontSize: 13,
        // fontWeight: 'bold'

    }, confirmboxtwo: {
        width: '100%',
        height: 180,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        paddingLeft: '5%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: -20,
        paddingTop: '2%'
    },
    confirmboxtwoC: {
        width: '100%',
        height: 120,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        paddingLeft: '5%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: -20,
        paddingTop: '2%'
    },
    offer: {
        width: 250,
        height: 30,
        backgroundColor: '#F9E28E',
        borderRadius: 10,
        top: 10,
        justifyContent: 'flex-start', alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '2%'
    },
    offerg: {
        width: 250,
        height: 30,
        backgroundColor: '#347442',
        borderRadius: 10,
        top: 10,
        justifyContent: 'flex-start', alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '2%',
        position:'relative'

    },
    offertext: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#B99207'
    },
    offertextg: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffff'
    },
    orderdetails: {

        flexDirection: 'row', top: '2%', justifyContent: "space-evenly"
    },
    confirmboxthree: {
        backgroundColor: 'white',
        // height:1000
    },
    paymentimg: {
        width: 150,
        height: 100,
        resizeMode: "cover",
        borderRadius: 10
    },
    checkingdetails: {
        width: '95%',
        height: 510,
        // backgroundColor:'red',
        top: '2%',
        alignSelf: "center",
        alignItems: 'center',
        paddingBottom: 5
        // maxHeight:450
    },
    checkingdetailsC: {
        width: '95%',
        height: 440,
        // backgroundColor:'red',
        top: '2%',
        alignSelf: "center",
        alignItems: 'center',
        // maxHeight:450
    },
    checkingbox: {
        flexDirection: 'row',
        width: '90%',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        top: '5%',
        // marginTop:'5%'
    },
    CheckingFooter: {
        width: '100%',
        height: 95,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        elevation: 5
    },
    footercontent: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        top: 10
        // backgroundColor:'red'

    },
    bookingContainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 0,
        alignItems: 'center',
    },
    bookingsBox: {
        width: '100%',
        height: 350,
        backgroundColor: 'white',
        top: '10%',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        borderTopColor: 'grey',
        borderTopWidth: 2,
    },
    bookedimg: {
        width: '90%',
        height: 130,
        resizeMode: "cover",
        borderRadius: 10
    },
    BookingboxContainer: {
        // backgroundColor: 'blue', 
        width: '100%',
        height: 180,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookingContainerboxes: {
        width: '50%',
        height: 165,
        //   backgroundColor: 'red' ,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookingContainerboxesone: {
        //   backgroundColor: 'green', 
        width: '100%', height: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'

    },
    bookingHoteldetails: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 0,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'grey',
    },
    bookingContainerboxlast: {
        //  backgroundColor: 'pink',
        width: '100%', height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ralert: {
        color: 'red'
    },
    galert: {
        color: "green",
        // alignSelf:'flex-start',
        // left:'20%'
    },
    radiobtndiv: {
        width: 400,
        height: 55,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    radiobtninnerdiv: {
        flexDirection: 'row'
    },
    radiobtntext: {
        top: 10
    },
    cardBox: {
        padding: 10,
    },
    cardContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        elevation: 2,
    },
    CardContainer: {
        alignItems: "center",
    },
    CardText: {
        fontSize: 16,
        marginBottom: 10,
    },
    Userscontainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        
    },
    Usersheading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    SearchContentBox: {
        // backgroundColor: '#F1ECEC',
        borderWidth: 0.5,
        width: 330,
        height: 330,
        marginLeft: 10,
        borderRadius: 25,
        marginTop: 10,
        overflow: 'hidden'

    },
    Searchimage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        marginTop: -15

    },
    cardField: {
        width: '100%',
        height: 50,
        marginVertical: 20,
    },
    BookingHeading: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: '11%',
        width: '100%',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    }



})