import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function PrasadamScreen({ navigation }) {
  const handleVideoFeedback = () => {
    navigation.navigate('VideoFeedback');
  };
  
  const handleFormFeedback = () => {
    // Navigate to form feedback screen if required
    navigation.navigate('FormFeedback');
    // Alert.alert("Form Feedback is under development.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To improve our services, please select the category and proceed to feedback</Text>

      <TouchableOpacity style={styles.button} onPress={handleVideoFeedback}>
        <Text style={styles.buttonText}>Video Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleFormFeedback}>
        <Text style={styles.buttonText}>Form Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
