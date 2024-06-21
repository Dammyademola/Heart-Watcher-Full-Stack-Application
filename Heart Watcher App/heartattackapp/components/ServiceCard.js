import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import styles from "../assets/stylesheets/components/ServiceCardStyles";

const ServiceCard = ({ item, onPress, inactive }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity 
      style={[styles.serviceCard, inactive && styles.inactiveCard]} 
      onPress={() => onPress(item)} 
      disabled={inactive}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text>Step {item.id}</Text>
      </View>

      {inactive ? (
        <View style={styles.checkIconContainer}>
          <FontAwesome name="check" size={24} color="rgba(0,88,47,1)" style={styles.checkIcon} />
        </View>
      ) : (
        <View style={styles.checkIconContainer}>
          <FontAwesome name="exclamation-circle" size={24} color="red" style={styles.checkIcon} />
        </View>
      )}

      

    </TouchableOpacity>
  );
}

export default ServiceCard;
