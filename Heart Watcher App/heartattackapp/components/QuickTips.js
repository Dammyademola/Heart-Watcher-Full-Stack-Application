import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { quickTipsData } from "../constants/QuickTipsData";

const QuickTips = ({ handleQuickTipPress }) => {
  const renderQuickTip = ({ item }) => (
    <TouchableOpacity style={styles.category} onPress={() => handleQuickTipPress(item.id)}>
      <View style={styles.group}>
        <FontAwesome name={item.icon} size={20} color="white" style={styles.icon} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.sectiontitle}>Quick Tips</Text>
      <FlatList
        data={quickTipsData}
        renderItem={renderQuickTip}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickTipsContainer}
      />
    </View>
  );
};

export default QuickTips;
