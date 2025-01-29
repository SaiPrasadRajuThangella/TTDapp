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
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setAudioPermission(status === 'granted');
    })();
  }, []);

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Record Video'}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  recordingButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
