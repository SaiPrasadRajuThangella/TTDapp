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
// import { UserContext } from "../navigation/AuthStack";
import { UserContext } from "../AuthStack";
import { RadioButton } from 'react-native-paper'; // Import RadioButton component

export default function FormFeedbackScreen({ navigation,route }) {
  // const [name, setName] = useState("");
  // const [mobile, setMobile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token } = useContext(UserContext);

  const { id,name,phoneNumber} = route.params;

  // Handle form submission
  console.log(id,name,phoneNumber)
  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setIsModalVisible(true);
    } else {
      Alert.alert("Error", "Please fill in all fields and answer all questions");
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate("Home");
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
        const response = await fetch(`http://192.168.0.125:7070/questions/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const text = await response.text();
        // console.log("Raw API Response:", text);

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

      {/* Questions List */}
      <View style={styles.questionsContainer}>
        <Text style={styles.subTitle}>Questions:</Text>
        {questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <View style={styles.answerContainer}>
              <RadioButton.Group
                onValueChange={(value) => handleAnswerSelect(question.id, value)}
                value={answers[question.id]}
              >
                <View style={styles.radioButtonContainer}>
                  <View style={styles.radioButtonOption}>
                    <RadioButton value="Yes" />
                    <Text style={styles.radioButtonText}>Yes</Text>
                  </View>
                  <View style={styles.radioButtonOption}>
                    <RadioButton value="No" />
                    <Text style={styles.radioButtonText}>No</Text>
                  </View>
                </View>
              </RadioButton.Group>
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
    marginTop: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    gap:20
  },
  radioButtonOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  selectedAnswer: {
    marginTop: 5,
    color: "#333",
    fontSize: 14,
  },
});
