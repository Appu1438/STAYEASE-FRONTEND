import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function ConfirmationModal ({isState}) {
  const [modalVisible, setModalVisible] = useState(isState?true:false);
  const [animation] = useState(new Animated.Value(0));

  const handleOpenModal = () => {
    setModalVisible(true);
    // Start the confirmation animation
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    // Reset animation and close the modal
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const confirmationAnimationStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1.2, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={styles.openButton}>Open Modal</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.confirmationContainer, confirmationAnimationStyle]}>
            <Text style={styles.confirmationText}>Confirmation Animation</Text>
          </Animated.View>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeButton}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    fontSize: 20,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContainer: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
  },
  confirmationText: {
    fontSize: 18,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
});

