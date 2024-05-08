import { View, Text, SafeAreaView, Pressable,StatusBar,StyleSheet, Alert } from "react-native"
import { Styles } from "../Common Component/Styles"
import React, { useEffect, useState } from "react"
import Loading from "../Common Component/loading"
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../Api";
import { BackHandler } from "react-native";




export default function Admin() {

    const [adminData,setAdminData]=useState('')


    async function getdata() {
        const token = await AsyncStorage.getItem('token');
        console.log("Profile",token);
         axios.post(`${API_BASE_URL}/user-data`, {token:token} )
            .then(res => {
                console.log(res.data);
                setAdminData(res.data.data)
            });
    }
    useEffect(()=>{
        getdata()
    },[])

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress)

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress)

            }

        })
    )

    const handleBackPress = () => {
        Alert.alert('Exit App', 'Are you sure want to exit?',
            [{
                text: "Cancel",
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: "Exit",
                onPress: () => BackHandler.exitApp(),
                style: 'cancel'
            }]
        )
        return true;
    }

    function SignOut(){
        AsyncStorage.setItem('isLoggedIn','')
        AsyncStorage.setItem('token','')       
        AsyncStorage.setItem('userType','')       
        navigation.navigate("AdminLogout")
    }

    const navigation=useNavigation()
    const [isLoading, setloading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }
   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View style={styles.header}>
                <Text style={styles.headerText}>Admin Profile</Text>
            </View>
            <View style={styles.content}>
                <ProfileItem icon={<Feather name="user" size={30} />} text={adminData.name} />
                <ProfileItem icon={<FontAwesome name="phone" size={30} />} text={adminData.number} />
                <ProfileItem icon={<Fontisto name="email" size={30} />} text={adminData.email} />
                <View style={styles.actions}>
                    <Pressable style={styles.actionButton} onPress={SignOut}>
                        <Text style={styles.actionButtonText}>Log Out</Text>
                    </Pressable>
                    <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Users')}>
                        <Text style={styles.actionButtonText}>Users</Text>
                    </Pressable>

                    <Pressable style={styles.actionButton} onPress={() => navigation.navigate('AddHotel')}>
                        <Text style={styles.actionButtonText}>Add Hotel</Text>
                    </Pressable>
                    <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Pendings')}>
                        <Text style={styles.actionButtonText}>Pending Requests</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const ProfileItem = ({ icon, text }) => (
    <View style={styles.profileItem}>
        {icon}
        <Text style={styles.profileItemText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileItemText: {
        marginLeft: 10,
        fontSize: 18,
    },
    actions: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: '#f73939',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

