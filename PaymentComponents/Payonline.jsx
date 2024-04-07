
import { View, Text, Pressable } from "react-native"
import { Styles } from "../Common Component/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


export default function PayOnline() {

    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [second, setSecond] = useState(0);
    const [isTimesUp, setIsTimesUp] = useState(false);
  
    const formatTime = (value) => (value < 10 ? `0${value}` : value);
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (hour === 0 && minutes === 0 && second === 0) {
          setIsTimesUp(true);
          clearInterval(timer);
        } else if (minutes === 0 && second === 0) {
          setHour((prevHour) => prevHour - 1);
          setMinutes(59);
          setSecond(59);
        } else if (second === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSecond(59);
        } else {
          setSecond((prevSecond) => prevSecond - 1);
        }
      }, 1000);
  
      return () => clearInterval(timer);
    }, [hour, minutes, second]);
  
    // Format time values
    const formattedHour = formatTime(hour);
    const formattedMinutes = formatTime(minutes);
    const formattedSecond = formatTime(second);
  
      return (
        <View style={Styles.confirmboxtwo}>
          <Text style={[Styles.confirmtext, { color: 'black' }]}>
          {isTimesUp?'You need to Pay full Amount':'Pay now and get a discount of 150'}  
          </Text>
          <View style={Styles.offer}>
            <FontAwesomeIcon size={20} icon={faTag} color="#B99207" />
            <Text style={Styles.offertext}>
            {isTimesUp?`Offer Time's Up`:` Offer valid till ${formattedHour}h:${formattedMinutes}m:${formattedSecond}s`}
             
            </Text>
          </View>
          <Pressable style={[Styles.btn, { width: '95%' }]}>
            <Text style={Styles.btntext}>
            {isTimesUp?'Pay Now 722':'Pay Now 572'}  

            </Text>
          </Pressable>
        </View>
      );
   
    }

