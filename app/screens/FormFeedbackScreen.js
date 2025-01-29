import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { UserContext } from "../navigation/AuthStack";

export default function FormFeedbackScreen({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token } = useContext(UserContext);

  // Handle form submission
  const handleSubmit = () => {
    if (name && mobile && feedback) {
      setIsModalVisible(true);
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  // Handle question answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    console.log("Token being sent:", token);

    async function getQuestions() {
      try {
        const response = await fetch("http://192.168.0.125:7070/questions/1", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const text = await response.text();
        console.log("Raw API Response:", text);

        try {
          const data = JSON.parse(text);
          console.log("Parsed Data:", data);
          setQuestions(data);
        } catch (error) {
          console.error("JSON Parse Error:", error);
          alert("Invalid response from server.");
        }

        if (!response.ok) {
          alert("Failed to fetch questions. Check your API.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Network request failed. Check your API URL and server.");
      }
    }

    getQuestions();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>

      {/* Name Field */}
      {/* <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Mobile Number Field */}
      {/* <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      // /> */} 

      {/* Feedback Text Field */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Questions List */}
      <View style={styles.questionsContainer}>
        <Text style={styles.subTitle}>Questions:</Text>
        {questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <View style={styles.answerContainer}>
              <TouchableOpacity
                style={styles.answerButton}
                onPress={() => handleAnswerSelect(question.id, "Yes")}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.answerButton}
                onPress={() => handleAnswerSelect(question.id, "No")}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.selectedAnswer}>
              {answers[question.id] ? `Selected: ${answers[question.id]}` : ""}
            </Text>
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>

      {/* Modal for Successful Submission */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Feedback Submitted Successfully!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  questionsContainer: {
    width: "100%",
    marginVertical: 20,
  },
  questionContainer: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  questionText: {
    fontSize: 16,
    color: "#333",
  },
  answerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  answerButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  selectedAnswer: {
    marginTop: 5,
    color: "#555",
    fontSize: 14,
  },
});
