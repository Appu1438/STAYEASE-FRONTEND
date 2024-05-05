import { SafeAreaView } from "react-native";
import { Text, View, Image, Pressable, Modal, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Styles } from "../Common Component/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
// import Payment from "./payment";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { Avatar } from "react-native-paper";

// import { FlatList } from "react-native-gesture-handler";



export default function ShowUsers({ }) {
    const navigation = useNavigation()
    const [allUsers, setAllUsers] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserImage, setSelectedUserImage] = useState('');

    async function getAllUsers() {
        axios.get(`${API_BASE_URL}/get-all-users`).then(res => {
            console.log('Users:', res.data)
            if (res.data.status == 'ok') {
                setAllUsers(res.data.data)
                Toast.show({
                    type: 'success',
                    text1: 'Users Fetched Successfully',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
                console.log("State", allUsers)
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(res.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            }
        }).catch(err => {
            Toast.show({
                type: 'error',
                text1: 'Error fetching Users',
                visibilityTime: 3000,
                position: 'bottom'
            })
        })
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const Usercard = ({ userdata }) => (
        <View style={Styles.cardBox}>
            <Pressable>
                <View style={Styles.cardContainer}>
                    <View style={Styles.CardContainer}>
                        <TouchableOpacity style={styles.imgbox}
                            onPress={() => {
                                setSelectedUserImage(userdata.image)
                                setModalVisible(true);
                            }}>
                            <Avatar.Image
                                size={98}
                                source={{
                                    uri:userdata.image
                                }} />
                        </TouchableOpacity>
                        <Text style={Styles.CardText}>Name: {userdata.name}</Text>
                        <Text style={Styles.CardText}>Number: {userdata.number}</Text>
                        <Text style={Styles.CardText}>Email: {userdata.email}</Text>
                        <Text style={Styles.CardText}>UserType: {userdata.userType}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )

    return (
        <View style={Styles.Userscontainer}>
            <Text style={Styles.Usersheading}>All Users</Text>
            <FlatList
                data={allUsers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Usercard userdata={item} />} />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Image
                            source={{ uri: selectedUserImage }}
                            style={styles.modalImage} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    imgbox: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginLeft: 0,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'grey'
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