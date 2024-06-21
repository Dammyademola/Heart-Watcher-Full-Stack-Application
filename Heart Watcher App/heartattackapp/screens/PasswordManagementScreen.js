import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";



import styles from "../assets/stylesheets/PersonalDetailsScreenStyles";
import {updatePasswordService} from "../services/native/UpdateService";
import { useDispatch } from "react-redux";
import { logout } from "../redux/AuthActions";



const PasswordManagementScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = React.useState('');
  const dispatch = useDispatch();

  const handleChangePassword = async () => {

    const userId = await AsyncStorage.getItem('userId');

    try {
        const userData = {
            newPassword
          };

        const response = await updatePasswordService(userId, userData);
    
        dispatch(logout());
     
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Landing" }],
            })
            );
    }
    catch (error){
        console.error("Error saving user password:", error);
    }

  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
                </TouchableOpacity>
                <Text style={styles.title}>Change Password</Text>
            </View>
            <TextInput
                style={[styles.input, newPassword.trim() !== "" && { borderColor: "rgba(0,88,47,1)" } ]}
                placeholder="Change Password"
                secureTextEntry
                onChangeText={setNewPassword}
                />
            <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordManagementScreen;
