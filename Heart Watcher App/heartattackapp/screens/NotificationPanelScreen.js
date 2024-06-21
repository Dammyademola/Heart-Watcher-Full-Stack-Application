import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../assets/stylesheets/NotificationPanelStyles";

const NotificationPanel = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      if (storedNotifications !== null) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.log("Error loading notifications: ", error);
    }
  };

  const clearNotifications = async () => {
    try {
      await AsyncStorage.removeItem("notifications");
      setNotifications([]);
    } catch (error) {
      console.log("Error clearing notifications: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationHeading}>Recent Notifications</Text>
            {notifications.map((notification, index) => (
              <View key={index} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{notification.message}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {notifications.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={clearNotifications}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default NotificationPanel;
