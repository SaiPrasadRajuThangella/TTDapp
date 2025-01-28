import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FeedbackScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To improve our services, please select the category and proceed to feedback:</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Prasadam')}>
        <Text style={styles.optionText}>Prasadam</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('OnlineTicketing')}>
        <Text style={styles.optionText}>Online Ticketing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Rooms')}>
        <Text style={styles.optionText}>Rooms</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('QueLine')}>
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
