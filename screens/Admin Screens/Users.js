import { SafeAreaView, TextInput,RefreshControl } from "react-native";
import { Text, View, Image, Pressable, Modal, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Styles } from "../../components/Common Component/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
// import Payment from "./payment";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import { Avatar } from "react-native-paper";
import getAllUsers from "../../Service/UserServices.js/GetAllUsers";
import { useSelector } from "react-redux";
import OpenDial from "../../Service/Map and Dial/Dial";

// import { FlatList } from "react-native-gesture-handler";



export default function ShowUsers({ }) {
    const navigation = useNavigation()
    const allUsers = useSelector(state => state.user.AllUsersData)
    console.log(allUsers)
    const userData = useSelector(state => state.user.userData)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserImage, setSelectedUserImage] = useState('');
    const [searchedUser, setsearchedUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(allUsers);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        // Call your refresh function here, for example:
        getAllUsers();
        // After fetching new data, set refreshing to false to stop the spinner
        setRefreshing(false);
      };
      

    useEffect(() => {
        setFilteredUsers(
            allUsers.filter(user =>
                user.email.toLowerCase().includes(searchedUser.toLowerCase()) ||
                user.name.toLowerCase().includes(searchedUser.toLowerCase()) ||
                user.number.toLowerCase().includes(searchedUser.toLowerCase())
            )
        );
    }, [searchedUser, allUsers]);


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
                                    uri: userdata.image
                                }} />
                        </TouchableOpacity>
                        <Text style={Styles.CardText}>Name: {userdata.name}</Text>
                        <TouchableOpacity onPress={() => OpenDial(userdata.number)}>
                            <Text style={Styles.CardText}>Number: {userdata.number}</Text>

                        </TouchableOpacity>
                        <Text style={Styles.CardText}>Email: {userdata.email}</Text>
                        <Text style={Styles.CardText}>UserType: {userdata.userType}</Text>
                    </View>
                </View>
            </Pressable>
            {userData.userType == 'SuperAdmin' ? (
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditUser', { data: userdata })}>
                <FontAwesomeIcon icon={faEdit} size={20} color="#0a84ff" />
            </TouchableOpacity>
            ) : (null)}

        </View>
    )

    return (
        <View style={Styles.Userscontainer}>
            <Text style={Styles.Usersheading}>All Users</Text>
            <Pressable style={[Styles.search, { marginBottom: 10, alignSelf: 'center' }]}>
                <Pressable style={{ position: 'absolute', alignSelf: 'flex-end', left: '5%', color: 'black' }}>
                    <FontAwesomeIcon size={15} icon={faSearch} />
                </Pressable>
                <TextInput
                    style={Styles.searchinput}
                    textAlign="center"
                    defaultValue={searchedUser}
                    placeholder="Search User by Name or Email"
                    onChange={(e) => setsearchedUser(e.nativeEvent.text)}
                />
            </Pressable>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredUsers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Usercard userdata={item} />}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
            />

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
    },
    editButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
})