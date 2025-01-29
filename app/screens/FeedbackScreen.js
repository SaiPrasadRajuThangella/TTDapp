import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function FeedbackScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNavigation = (category) => {
    if (name && phoneNumber) {
      navigation.navigate(category, { name, phoneNumber });
    } else {
      alert('Please enter both your name and phone number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        To improve our services, please enter your details and select a category to proceed to feedback:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('Prasadam')}>
        <Text style={styles.optionText}>Prasadam</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('OnlineTicketing')}>
        <Text style={styles.optionText}>Online Ticketing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('Rooms')}>
        <Text style={styles.optionText}>Rooms</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleNavigation('QueLine')}>
        <Text style={styles.optionText}>Que Line</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  option: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});
