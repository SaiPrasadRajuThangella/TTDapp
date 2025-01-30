import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

export default function VideoFeedbackScreen1() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [audioPermission, setAudioPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0); // Timer state
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setAudioPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1); // Increment timer every second
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup the timer when the component unmounts
  }, [isRecording]);

  if (!permission || !audioPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted || !audioPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need camera and microphone permissions to record video</Text>
        <Button
          onPress={async () => {
            await requestPermission();
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setAudioPermission(status === 'granted');
          }}
          title="Grant permissions"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        setVideoUri(null);
        setRecordingTime(0); // Reset timer when starting a new recording
        const videoRecordPromise = cameraRef.current.recordAsync({
          maxDuration: 30,
          quality: '720p',
          mute: false,
        });

        setTimeout(() => {
          stopRecording();
        }, 30000);

        const data = await videoRecordPromise;

        setVideoUri(data.uri);
        setIsRecording(false);

        // Navigate to VideoSubmitScreen with the recorded video
        navigation.navigate('VideoSubmitScreen', { videoUri: data.uri });
      } catch (error) {
        console.error('Failed to record video:', error);
        alert('Error recording video: ' + error.message);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} audio={true} mode="video">
        {/* Timer at the top */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{recordingTime}s</Text>
        </View>
      </CameraView>

      {/* Button Container at the Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={toggleCameraFacing}>
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circleButton, isRecording && styles.recordingButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop' : 'Record'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  timerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  timerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30, // Ensure buttons are at the bottom of the screen
    width: '100%',
    paddingHorizontal: 20,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  recordingButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
