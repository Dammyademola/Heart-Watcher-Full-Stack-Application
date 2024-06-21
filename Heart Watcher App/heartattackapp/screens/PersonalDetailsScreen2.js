import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { logout } from "../redux/AuthActions";
import { CommonActions } from "@react-navigation/native";


import styles from "../assets/stylesheets/PersonalDetailsScreenStyles";

import { getUserRecords } from "../services/native/UserRecords";
import {updateDetailsService} from "../services/native/UpdateService";


const PersonalDetailsScreen2 = ({ navigation }) => {
  const [userRecords, setUserRecords] = useState([]);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(""));
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  
  const handleSave = async () => {
      const userId = await AsyncStorage.getItem('userId');
      
      try {
          
          const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];
          
          const userData = {
              firstName,
              lastName,
              email,
              formattedDateOfBirth,
              height,
              weight,
              gender
            };
            
            const response = await updateDetailsService(userId, userData);
            
            dispatch(logout());
            
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Landing" }],
                })
                );
                
            } catch (error) {
                console.error("Error saving user details:", error);
                
            }
        };
        
        const handlePassword = async () => {
            navigation.navigate("InsideApp", { screen: "PasswordManagement" });
        };
        
        useEffect(() => {
          const fetchUserRecords = async () => {
            try {
              const userId = await AsyncStorage.getItem('userId');
              const records = await getUserRecords(userId);
              setUserRecords(records);
        
              const userRecord = records[0]; 
        
              if (userRecord) {
                setFirstName(userRecord.first_name);
                setLastName(userRecord.last_name);
                setEmail(userRecord.email);
                setDateOfBirth(new Date(userRecord.date_of_birth));
                setHeight(userRecord.height.toString());
                setWeight(userRecord.weight.toString());
                setGender(userRecord.gender);
              }
            } catch (error) {
              console.error("Error fetching user records:", error);
            }
          };
        
          fetchUserRecords();
        }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
          </TouchableOpacity>
          <Text style={styles.title}>Personal Details</Text>
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
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateOfBirthText}>
              {dateOfBirth.toLocaleDateString()}
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
                  value={dateOfBirth}
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

          <TouchableOpacity
            style={styles.button}
            onPress={handlePassword}
          >
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>


        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetailsScreen2;
