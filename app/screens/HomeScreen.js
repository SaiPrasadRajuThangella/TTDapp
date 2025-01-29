import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../navigation/AuthStack';

export default function HomeScreen({ navigation }) {
  // const user = 'User'; // Replace with the actual username from your login state
  const {user} = useContext(UserContext)
console.log(user)
  const holder = user.fullName
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome {holder}!</Text>
      </View>
      
      <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('Feedback')}>
        <Text style={styles.feedbackButtonText}>Give Feedback</Text>
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
  header: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  feedbackButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
