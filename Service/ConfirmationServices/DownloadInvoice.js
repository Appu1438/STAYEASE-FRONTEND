import React, { useState } from 'react';
import { View, Button, Text, Linking, StyleSheet } from 'react-native';
import axios from 'axios';

import API_BASE_URL from '../../Api';

const createInvoice = async (amount, Userdata) => {

  try {
    const response = await axios.post(`${API_BASE_URL}/create-invoice`, {
      // Replace with actual customer ID
      customerName: Userdata.name, // Replace with actual customer ID
      customerEmail: Userdata.email, // Replace with actual customer ID
      amount: amount, // Amount in dollars
      description: `Booking Fee for Hotel Reservation in STAYEASE`,
    });
    return (response.data.data);
  } catch (error) {
    console.error('Error creating invoice:', error);
  } finally {

  }
};



export default createInvoice;
