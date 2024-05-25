import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import API_BASE_URL from '../Api';
import { faL } from '@fortawesome/free-solid-svg-icons';

const NeedHelp = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [waitingForBookingId, setWaitingForBookingId] = useState(false);
  const scrollViewRef = useRef();

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    // Add user's message to chat history
    setChatHistory(prevChatHistory => [
      ...prevChatHistory,
      { text: message, fromUser: true }
    ]);

    if (waitingForBookingId) {
      // User has sent the booking ID
      const bookingId = message.trim();
      try {
        const response = await axios.get(`${API_BASE_URL}/get-booking-by-BookingId/${bookingId}`);
        const bookingDetails = response.data;

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
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: formattedBookingDetails, fromUser: false }
        ]);

        // Add thank you message to chat history
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: 'Thank you for using our service!', fromUser: false }
        ]);

        setWaitingForBookingId(false);
      } catch (error) {
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: 'Sorry, I could not find that booking ID. Please try again.', fromUser: false }
        ]);
      }
    } else {
      // Initial message from user
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        { text: 'Please provide your booking ID.', fromUser: false }
      ]);
      setWaitingForBookingId(true);
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, paddingBottom: 10 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
          />
          <Pressable
            style={{ width: 60, height: 40, left: 5, backgroundColor: '#39a8db', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
            onPress={handleSendMessage}
          >
            <Text>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NeedHelp;
