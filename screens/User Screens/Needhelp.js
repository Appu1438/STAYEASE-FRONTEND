import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setWaitingFalse, setWaitingTrue } from '../../Redux/Chat'

const NeedHelp = () => {
  const dispatch = useDispatch()
  const chatHistory = useSelector(state => state.chat.chatHistory)
  const [message, setMessage] = useState('');
  const waitingForBookingId = useSelector(state=>state.chat.waitingForId)
  const allBookings = useSelector(state => state.booking.Bookings.AllBookings)

  const scrollViewRef = useRef();

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    // Add user's message to chat history
    dispatch(addMessage({ text: message, fromUser: true }));

    if (waitingForBookingId) {
      // User has sent the booking ID
      const bookingId = message.trim();
      try {
        const bookingDetails = allBookings.find(booking => booking.BookingId === bookingId);

        if (bookingDetails) {
          // Format booking details
          const formattedBookingDetails = `
 Booking ID: ${bookingDetails.BookingId}
         
 Hotel Name: ${bookingDetails.hotelName}
         
 Booked At: ${new Date(bookingDetails.BookedAt).toLocaleString()}
         
 Check In: ${new Date(bookingDetails.CheckIn).toLocaleString()}
         
 Check Out: ${new Date(bookingDetails.CheckOut).toLocaleString()}
         
 Rooms: ${bookingDetails.Rooms}
         
 Guests: ${bookingDetails.Guests}
         
 Total Amount: ${bookingDetails.TotalAmount}
         
 Booking Status: ${new Date(bookingDetails.CheckOut) > new Date() ? 'Confirmed' : 'Expired'}
         
 Online Payment Status: ${bookingDetails.PaymentStatus}
                 `;
          // Add formatted booking details to chat history
          dispatch(addMessage({ text: formattedBookingDetails, fromUser: false }));

          dispatch(addMessage({ text: 'Thank you for using our service!', fromUser: false }));
          dispatch(setWaitingFalse());

        } else {
          dispatch(addMessage({ text: 'Sorry, I could not find that booking ID. Please try again.', fromUser: false }));
        }

      } catch (error) {
        dispatch(addMessage({ text: 'Sorry, I could not find that booking ID. Please try again.', fromUser: false }));
      }
    } else {
      // Initial message from user
      dispatch(addMessage({ text: 'Please provide your booking ID.', fromUser: false }));
      dispatch(setWaitingTrue());
    }

    setMessage('');
  };

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [chatHistory]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 20 }} behavior="padding">
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.map((chat, index) => (
            <View key={index} style={{ flexDirection: chat.fromUser ? 'row-reverse' : 'row' }}>
              <View style={{ backgroundColor: chat.fromUser ? '#cce5ff' : '#e6e6e6', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text>{chat.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, paddingBottom: 10,justifyContent:'center' }}>
          <TextInput
            style={style.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
          />
          <Pressable
            style={style.btn}
            onPress={handleSendMessage}
          >
            <Text style={style.btnText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const style={
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    shadowColor: '#39a8db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    top: 10
},
btn: {
  width: '15%',
  height: 40,
  backgroundColor: '#39a8db',
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  top: 13,
  left:5
},
btnText: {
  color: '#fff',
  fontSize: 15,
  // fontWeight: 'bold',
},
}

export default NeedHelp;
