

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

            <View style={Styles.navone}>
                
                    <TouchableOpacity style={styles.imgbox} >
                            <Avatar.Image
                                size={50}
                                source={{
                                    uri:user.image==''||user.image==null||user.image==undefined? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                                :user.image   }} />
                        </TouchableOpacity>

                <View style={{ width: '65%',justifyContent:'center' }}>
                    <Text style={Styles.navtextone}>{user?user.name:'Name'}</Text>
                    <Text style={Styles.navtexttwo}>+91 {user?user.number:'Number'}</Text>
                </View>

                <Pressable style={{ width: '10%' }} onPress={() => {
                    navigation.navigate("Profile");
                    setState(false);
                }}>
                    <AntDesign name="rightcircleo" size={20} />
                </Pressable>
            </View>
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
