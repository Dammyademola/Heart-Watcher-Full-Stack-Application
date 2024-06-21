import React from "react";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { View, StyleSheet, Dimensions } from 'react-native';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const screenHeight = Dimensions.get('window').height;
  return (
    <Provider store={store}>
      <View style={[styles.container, { height: screenHeight }]}>
        <ExpoStatusBar style="auto" />
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
