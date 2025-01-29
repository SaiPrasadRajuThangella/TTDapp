import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function VideoSubmitScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { videoUri } = route.params;

  const [feedback, setFeedback] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!feedback) {
      alert('Please select a feedback option.');
      return;
    }

    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Feedback', { submitted: true });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={{ uri: videoUri }}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        onError={(error) => {
          console.error('Video Error:', error);
          alert('Failed to load the video.');
        }}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VideoFeedbackScreen1')}>
        <Text style={styles.buttonText}>Record Another</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Feedback:</Text>
      <View style={styles.feedbackContainer}>
        {['Good', 'Average', 'Bad'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setFeedback(option)}
            accessible={true}
            accessibilityRole="radio"
            accessibilityState={{ selected: feedback === option }}
          >
            <View style={[styles.circle, feedback === option && styles.selectedCircle]} />
            <Text style={[styles.radioText, feedback === option && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Feedback submitted successfully</Text>
          <Text style={styles.modalText}>Redirecting you....</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  video: { width: '100%', height: 250, marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginBottom: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  feedbackContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  radioButton: { flexDirection: 'row', alignItems: 'center' },
  circle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', marginRight: 10 },
  selectedCircle: { borderColor: '#007bff', backgroundColor: '#007bff' },
  radioText: { fontSize: 16 },
  selectedText: { fontWeight: 'bold', color: '#007bff' },
  submitButton: { backgroundColor: 'green', padding: 12, marginTop: 20, borderRadius: 5 },
  submitText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  modalView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalText: { backgroundColor: 'white', padding: 20, borderRadius: 5, fontSize: 18 },
});
