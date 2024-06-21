import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { loginSuccess } from "../redux/AuthActions";
import { registerUser } from "../services/native/AuthService";
import { validateEmail, validatePassword } from "../utils/Validation";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from 'react-native-paper';

import alertService from "../services/native/AlertService";
import styles from "../assets/stylesheets/SignUpStyles";
import TandCModal from "../components/TandCModal";


const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateofbirth, setDateOfBirth] = useState(new Date());
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);


  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      validateEmail(email) &&
      validatePassword(password) &&
      height.trim() !== "" &&
      weight.trim() !== "" &&
      gender !== "" &&
      termsAccepted
    );
  };

  useEffect(() => {
    setIsSignUpDisabled(!isFormValid());
  }, [firstName, lastName, email, password, termsAccepted]);

  const handleSignUp = async () => {
    if (!isFormValid()) {
      return;
    }

    try {
      const formattedDateOfBirth = dateofbirth.toISOString().split('T')[0];
      
      const userData = {firstName, lastName, email, password, formattedDateOfBirth, height, weight, gender};

      const response = await registerUser(userData);

      dispatch(loginSuccess());

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );

    } catch (error) {
      console.error("Error registering user:", error);
      await alertService.showAlert(
        "Error",
        "An error occurred during registration. Please try again later."
      );
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const toggleModalTandC = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Sign up</Text>
          </View>
          <View style={styles.nameContainer}>
            <TextInput
              style={[styles.input, styles.firstNameInput, firstName.trim() !== "" && { borderColor: "rgba(0,88,47,1)" } ]}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <View style={{ width: 10 }} />
            <TextInput
              style={[styles.input, styles.lastNameInput, lastName.trim() !== "" && { borderColor: "rgba(0,88,47,1)" } ]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <TextInput
            style={[styles.input, email.trim() !== "" && { borderColor: "rgba(0,88,47,1)" } ]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, password.trim() !== "" && { borderColor: "rgba(0,88,47,1)" } ]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateOfBirthText}>
              {dateofbirth.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <Modal
            visible={showDatePicker}
            transparent={false}
            animationType="slide"
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={dateofbirth}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setDateOfBirth(selectedDate);
                    }
                  }}
                  textColor="#000"
                />
              </View>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "Male" && styles.selectedGenderOption,
              ]}
              onPress={() => setGender("Male")}
            >
              <Text style={[
              styles.genderOptionText,
              gender === 'Male' && styles.selectedGenderOptionText,
            ]}>Male</Text>
            
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "Female" && styles.selectedGenderOption,
              ]}
              onPress={() => setGender("Female")}
            >
              <Text style={[
              styles.genderOptionText,
              gender === 'Female' && styles.selectedGenderOptionText,
            ]}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "Other" && styles.selectedGenderOption,
              ]}
              onPress={() => setGender("Other")}
            >
              <Text style={[
              styles.genderOptionText,
              gender === 'Other' && styles.selectedGenderOptionText,
            ]}>Other</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            <TextInput
              style={styles.measurementinput}
              placeholder="Height"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />

            <TouchableOpacity style={styles.inputbutton}>
              <Text style={styles.unitText}>CM</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            <TextInput
              style={styles.measurementinput}
              placeholder="Weight"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />

            <TouchableOpacity style={styles.inputbutton}>
              <Text style={styles.unitText}>KG</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
          <View style={styles.checkboxStyle}>
            <Checkbox
                status={termsAccepted ? 'checked' : 'unchecked'}
                onPress={() => {
                    setTermsAccepted(!termsAccepted);
                }}
                color="rgba(0,88,47,1)"
                />
            </View>
            <Text style={styles.checkboxLabel}> 
                <Text style={styles.linkText} onPress={toggleModalTandC}>
                I agree to the terms & conditions
                </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={isSignUpDisabled}
          >
            <Text style={styles.buttonText}>Join Us</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.registerLink}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>

      </TouchableWithoutFeedback>
      <TandCModal isVisible={isModalVisible} toggleModal={toggleModalTandC} />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
