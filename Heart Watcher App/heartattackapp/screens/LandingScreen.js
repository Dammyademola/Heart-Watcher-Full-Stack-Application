import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import styles from "../assets/stylesheets/LandingScreenStyles";

const LandingScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Watcher</Text>
      <Text style={styles.subtitle}>
        Unlock the hidden secrets to your heart's health.
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/landingpage.png")}
          style={styles.image}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;
