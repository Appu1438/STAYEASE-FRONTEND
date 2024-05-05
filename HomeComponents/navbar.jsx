

// import React, { useState,useEffect } from "react";
// import { View, Pressable, StyleSheet ,Text,Animated} from "react-native";
// import { Styles } from "../Common Component/Styles";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faClose, faL, faUser } from "@fortawesome/free-solid-svg-icons";
// import EvilIcon from 'react-native-vector-icons/EvilIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from "@react-navigation/native";





// export default function Navbar({ isState, setState,user }) {

//     const navigation=useNavigation()
//     const [animatedValue, setAnimatedValue] = useState(new Animated.Value(isState ? 0 : -350));

//     const toggleNavbar = () => {
//         const newValue = isState ? 0 : -350;
//         Animated.timing(animatedValue,
//              {
//             toValue: newValue,
//             duration: 400,
//             useNativeDriver: false,
//             }).start();
//     };

//     // Call toggleNavbar when isState changes
//    useEffect(() => {
//         toggleNavbar();
//     }, [isState]);

//     return (
//         <Animated.View style={[Styles.navbar,{ transform:[{ translateX: animatedValue }]} ]} >
//             <Pressable style={Styles.close} onPress={() => setState(false)}>
//                 <EvilIcon name="close" size={30}/>
//             </Pressable>

//             <View style={Styles.navone}>

//                 <View style={{width:'20%'}}> 
//                      <EvilIcon name="user" size={50}  style={{}} />
//                 </View>


//                 <View style={{width:'65%'}}>
//                     <Text style={Styles.navtextone}>{user.name}</Text>
//                     <Text style={Styles.navtexttwo}>+91 {user.number}</Text>
//                 </View>

//                 <Pressable style={{width:'10%'}} onPress={()=>{
//                     navigation.navigate("Profile")
//                     setState(false)
//                     }}> 
//                      <AntDesign style={{}} name="rightcircleo" size={20}/>
//                 </Pressable>
                

//             </View>
//         </Animated.View>
//     );
// }
import React, { useState, useEffect, useRef } from "react";
import { View, Pressable, Text, Animated, TouchableOpacity,StyleSheet } from "react-native";
import { Styles } from "../Common Component/Styles";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

const Navbar = ({ isState, setState, user }) => {
    const navigation = useNavigation();
    const [animatedValue] = useState(new Animated.Value(isState ? 0 : -350));
    const animationRef = useRef(null);

    useEffect(() => {
        animationRef.current = Animated.timing(animatedValue, {
            toValue: isState ? 0 : -350,
            duration: 400,
            useNativeDriver: true, // Use the native driver
        });
    }, [animatedValue, isState]);

    const toggleNavbar = () => {
        if (animationRef.current) {
            animationRef.current.start();
        }
    };

    useEffect(() => {
        toggleNavbar();
    }, [isState]);

    return (
        <Animated.View style={[Styles.navbar, { transform: [{ translateX: animatedValue }] }]}>
            <Pressable style={Styles.close} onPress={() => setState(false)}>
                <EvilIcon name="close" size={30} />
            </Pressable>

            <Pressable style={Styles.navone} onPress={() => {
                    navigation.navigate("Profile");
                    setState(false);
                }}>
                
                    <TouchableOpacity style={styles.imgbox} >
                            <Avatar.Image
                                size={50}
                                source={{
                                    uri:user?user.image:null  }} />
                        </TouchableOpacity>

                <View style={{ width: '65%',justifyContent:'center' }}>
                    <Text style={[Styles.navtextone,{left:10}]}>{user?user.name:'Name'}</Text>
                    <Text style={Styles.navtexttwo}>+91 {user?user.number:'Number'}</Text>
                </View>

                <Pressable style={{ width: '10%' }} >
                    <AntDesign name="rightcircleo" size={20} />
                </Pressable>
            </Pressable>
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    imgbox: {
        width: 50,
        height:50,
        borderRadius: 100,
        marginLeft: 10,
        marginTop: -5,
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'grey'
    },
})
export default Navbar;
