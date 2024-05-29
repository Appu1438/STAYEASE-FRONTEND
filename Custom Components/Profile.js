import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, Modal } from "react-native"
import { Styles } from "../Common Component/Styles"
import React, { useEffect, useState } from "react"
import Loading from "../Common Component/loading"
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import getdata from "../Service/UserServices.js/Getdata";







export default function Profile() {

    const navigation = useNavigation()
    console.log(userData);
    // const [userData, setUserData] = useState('')
    const userData = useSelector(state => state.user.userData)
    const [modalVisible, setModalVisible] = useState(false);



    useFocusEffect(
        React.useCallback(() => {
            getdata()
        })
    )


    function SignOut() {
        AsyncStorage.setItem('isLoggedIn', '')
        AsyncStorage.setItem('token', '')
        AsyncStorage.setItem('userType', '')
        navigation.navigate("UserLogout")
    }

    function alertDlt() {
        Alert.alert('Delete Account', 'Do you want to delete Account',
            [{
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            }, {
                text: 'Delete',
                onPress: () => handleDelete(),
                style: 'cancel'
            }
            ])
        return true;
    }

    async function handleDelete() {
        const UserEmail = userData.email
        const userID = userData._id
        console.log(userID)
        console.log('Dlt')
        axios.post(`${API_BASE_URL}/delete-user`, { email: UserEmail, userId: userID }).then(res => {
            console.log(res.data.data)
            if (res.data.status == 'ok') {
                SignOut()
                Toast.show({
                    type: 'success',
                    text1: 'Account Deleted',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(res.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }



    if (!userData) {
        return (
            <Loading />
        )
    }
    else {

        return (
            <SafeAreaView style={[Styles.profilecontainer,]}>

                <TouchableOpacity style={styles.imgbox} onPress={() => setModalVisible(true)} >
                    <Avatar.Image
                        size={179}
                        source={{
                            uri: userData ? userData.image : null
                        }} />
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image source={{ uri: userData ? userData.image : null }} style={styles.modalImage} />
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Pressable onPress={() => navigation.navigate('UpdateProfile', { data: userData })} style={styles.button}>
                    <FontAwesome name="edit" size={24} color="white" style={styles.icon} />
                    <Text style={styles.text}>Edit Profile</Text>
                </Pressable>

                <View style={{ height: '40%', backgroundColor: 'yelow' }}>

                    <View style={Styles.profilebox}>

                        <Text style={[Styles.navtextone, { left: 0 }]}>Username</Text>
                        <Text style={[Styles.navtextone, { left: 0 }]}> {userData ? userData.name : 'Name'}</Text>
                    </View>

                    <View style={Styles.profilebox}>
                        <Text style={[Styles.navtextone, { left: 0 }]}>Mobile No:</Text>

                        <Text style={[Styles.navtextone, { left: 0 }]}>{userData ? userData.number : 'Number'}</Text>
                    </View>

                    <View style={Styles.profilebox}>
                        <Text style={[Styles.navtextone, { left: 0 }]}>Email</Text>

                        <Text style={[Styles.navtextone, { left: 0 }]}>{userData ? userData.email : 'Email'}</Text>
                    </View>




                </View>

                <Pressable style={Styles.btn} onPress={() => {
                    alertDlt()
                }}>
                    <Text style={Styles.btntext}>Delete Account</Text>
                </Pressable>

                <Pressable style={Styles.btn} onPress={() => {
                    SignOut()
                }}>
                    <Text style={Styles.btntext}>Log Out</Text>
                </Pressable>





            </SafeAreaView>
        )

    }

}

const styles = StyleSheet.create({
    imgbox: {
        width: 180,
        height: 180,
        borderRadius: 100,
        marginLeft: 0,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'grey'
    },
    editButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#0b84db',
        borderRadius: 20,
        padding: 5
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#007bff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    icon: {
        marginRight: 10,
        color: '#0b84db'
    },
    text: {
        color: 'white',
        fontSize: 16,
        color: '#0b84db'
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    modalImage: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
})