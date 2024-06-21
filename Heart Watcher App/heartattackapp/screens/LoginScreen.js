import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";


import { loginSuccess } from "../redux/AuthActions";
import { loginUser } from '../services/native/AuthService';
import alertService from '../services/native/AlertService';
import styles from "../assets/stylesheets/LogInStyles";


const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsSignInDisabled, setIsSignInDisabled] = useState(true);

  
  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '';
  };

  useEffect(() => {
    setIsSignInDisabled(!isFormValid());
  }, [email, password]);

  const handleLogin = async () => {
    if (!isFormValid()) {
      return;
    }

    try {
      const userData = {
        email,
        password
      };

    const { userId } = await loginUser(userData);

    await AsyncStorage.setItem('userId', userId.toString());
    
    dispatch(loginSuccess());

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );

  } catch (error) {
    console.error('Error logging user:', error);
    await alertService.showAlert('Error', 'An error occurred during logging. Please try again later.');    
  }

  };

  const handleRegister = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.arrow}
            >
              <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.title}>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={IsSignInDisabled}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>Register here</Text>
              </TouchableOpacity>
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
