import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserRecords } from "../services/native/UserRecords";
import { logout } from "../redux/AuthActions";
import styles from "../assets/stylesheets/SettingScreenStyles";
import AboutUsModal from "../components/AboutUsModal";
import TandCModal from "../components/TandCModal";

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userRecords, setUserRecords] = useState([]);
  const [isAboutUsModalVisible, setIsAboutUsModalVisible] = useState(false);
  const [isTandCModalVisible, setIsTandCModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const handleSignOut = () => {
    dispatch(logout());

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Landing" }],
      })
    );
  };

  const handlePersonaldetails = () => {
    navigation.navigate("InsideApp", { screen: "Personal2" });
  };

  const toggleAboutUsModal = () => {
    setIsAboutUsModalVisible(!isAboutUsModalVisible);
  };

  const toggleTandCModal = () => {
    setIsTandCModalVisible(!isTandCModalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const records = await getUserRecords(userId);
        setUserRecords(records);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handlePersonaldetails}>
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <Feather
            name="user"
            size={70}
            color="rgba(0,88,47,1)"
            style={styles.profilePicture}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>
              {userRecords.length > 0 ? userRecords[0].first_name : ""}{" "}
              {userRecords.length > 0 ? userRecords[0].last_name : ""}
            </Text>
            <Text style={styles.subName}>
              Sex: {userRecords.length > 0 ? userRecords[0].gender : ""}
            </Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>

      {/* Other sections */}

      <View style={styles.section}>
        <TouchableOpacity onPress={handlePersonaldetails}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <FontAwesome
                name="user"
                size={screenWidth * 0.05}
                color="rgba(0,88,47,1)"
                style={styles.icon}
              />
              <Text style={styles.title}>Personal Details</Text>
              <View style={styles.contentContainer2}>
                <FontAwesome
                  name="arrow-right"
                  size={screenWidth * 0.05}
                  color="rgba(0,88,47,1)"
                  style={styles.arrowicon}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={toggleTandCModal}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <FontAwesome
                name="heart"
                size={screenWidth * 0.05}
                color="rgba(0,88,47,1)"
                style={styles.icon}
              />
              <Text style={styles.title}>Terms and Conditions</Text>
              <View style={styles.contentContainer2}>
                <FontAwesome
                  name="arrow-right"
                  size={screenWidth * 0.05}
                  color="rgba(0,88,47,1)"
                  style={styles.arrowicon}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={toggleAboutUsModal}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <FontAwesome
                name="book"
                size={screenWidth * 0.05}
                color="rgba(0,88,47,1)"
                style={styles.icon}
              />
              <Text style={styles.title}>About Us</Text>
              <View style={styles.contentContainer2}>
                <FontAwesome
                  name="arrow-right"
                  size={screenWidth * 0.05}
                  color="rgba(0,88,47,1)"
                  style={styles.arrowicon}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={handleSignOut}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <FontAwesome
                name="times"
                size={screenWidth * 0.05}
                color="rgba(0,88,47,1)"
                style={styles.icon}
              />
              <Text style={styles.title}>Sign Out</Text>
              <View style={styles.contentContainer2}>
                <FontAwesome
                  name="arrow-right"
                  size={screenWidth * 0.05}
                  color="rgba(0,88,47,1)"
                  style={styles.arrowicon}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <AboutUsModal
        isVisible={isAboutUsModalVisible}
        toggleModal={toggleAboutUsModal}
      />
      <TandCModal
        isVisible={isTandCModalVisible}
        toggleModal={toggleTandCModal}
      />
    </View>
  );
};

export default SettingScreen;
