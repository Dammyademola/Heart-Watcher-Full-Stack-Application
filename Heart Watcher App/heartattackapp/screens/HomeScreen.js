import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from "../assets/stylesheets/HomeScreenStyles";

import { getUserRecords } from "../services/native/UserRecords";
import { quickTipsData } from "../constants/QuickTipsData";
import ServiceCard from "../components/ServiceCard";
import ServiceData from "../constants/ServiceData";
import {
  checkData, checkMedicalData, checkUsageCHF, checkUsageMI
} from "../services/native/FilteredServiceData";

import MIModal from "../components/MIModal";
import CHFModal from "../components/CHFModal";

const HomeScreen = ({ navigation }) => {
  
  const [filteredServices, setFilteredServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [userRecords, setUserRecords] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const screenWidth = Dimensions.get("window").width;

  const handleServicePress = (itemId, active) => {
    if (active) {
      switch (itemId) {
        case 1:
          navigation.navigate("InsideApp", { screen: "Personal" });
          break;
        case 2:
          navigation.navigate("InsideApp", { screen: "Medical" });
          break;
        case 4:
          toggleModalMI();
          break;
        case 5:
          toggleModalCHF();
          break;
        default:
          break;
      }
    }
  };

  const renderServiceCard = ({ item }) => (
    <ServiceCard
      item={item}
      onPress={() => handleServicePress(item.id, item.active)}
      inactive={!item.active}
    />
  );

  
  const handleProfilePress = () => {
    navigation.navigate("InsideApp", { screen: "Personal2" });
  };

  const handleNotificationPress = () => {
    navigation.navigate("InsideApp", { screen: "NotificationPanel" });
  };

  const handleSeeAll = () => {
    navigation.navigate("InsideApp", { screen: "PredictiveModels" });
  };

  const renderQuickTip = ({ item }) => (
    <TouchableOpacity style={styles.category}>
      <View style={styles.group}>
        <FontAwesome
          name={item.icon}
          size={20}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleModalMI = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalCHF = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const records = await getUserRecords(userId);
      setUserRecords(records);

      const checksPersonalDetails = await checkData(userId);
      const checksMedicalDetails = await checkMedicalData(userId);
      const checksCHFUsage = await checkUsageCHF(userId);
      const checksMIUsage = await checkUsageMI(userId);


      const filtered = ServiceData.map((item) => {
        let active = true;

        if (item.id === 1 && checksPersonalDetails === true) {
          active = false;
        }

        if (item.id === 2 && checksMedicalDetails === true) {
          active = false;
        }

        if (item.id === 4 && checksCHFUsage === true) {
          active = false;
        }

        if (item.id === 5 && checksMIUsage === true) {
          active = false;
        }

        return { ...item, active };
      });

      setFilteredServices(filtered);

      const storedNotifications = await AsyncStorage.getItem("notifications");
      if (storedNotifications !== null) {
        const notifications = JSON.parse(storedNotifications);
        setNotificationCount(notifications.length);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Feather
            name="user"
            size={screenWidth * 0.08}
            color="rgba(0,88,47,1)"
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          Good morning, {userRecords.length > 0 ? userRecords[0].first_name : ''}
        </Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <View style={styles.bellContainer}>
            <FontAwesome name="bell-o" size={25} color="rgba(0,88,47,1)" />
            {notificationCount > 0 && (
              <View style={styles.notificationCountContainer}>
                <Text style={styles.notificationCountText}>{notificationCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectiontitle}>Featured</Text>
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.serviceContainer}
        />
      </View>

      <View style={styles.predictiveModelContainer}>
        <View style={styles.predictiveModelHeader}>
          <Text style={styles.predictiveModelTitle}>Predictive Models</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.predictiveModelGrid}>
          <View style={styles.predictiveModelCard}>
            <TouchableOpacity onPress={toggleModalCHF}>
              <View style={styles.predictiveModelImageContainer}>
                <Image
                  style={styles.predictiveModelImage}
                  source={require("../assets/images/heartimage.jpg")}
                />
              </View>
              <Text style={styles.predictiveModelName}>
                Congestive Heart Prediction
              </Text>
              <View style={styles.predictiveModelDetails}>
                <Text style={styles.predictiveModelDetailText}>
                  Predictive Model
                </Text>
                <View style={styles.predictiveModelPriceContainer}>
                  <Text style={styles.predictiveModelPrice}>Try it Now</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.predictiveModelCard}>
            <TouchableOpacity onPress={toggleModalMI}>
              <View style={styles.predictiveModelImageContainer}>
                <Image
                  style={styles.predictiveModelImage}
                  source={require("../assets/images/old-ladyheart.jpg")}
                />
              </View>
              <Text style={styles.predictiveModelName}>
                Myocardial Infarction Prediction
              </Text>
              <View style={styles.predictiveModelDetails}>
                <Text style={styles.predictiveModelDetailText}>
                  Predictive Model
                </Text>
                <View style={styles.predictiveModelPriceContainer}>
                  <Text style={styles.predictiveModelPrice}>Try it Now</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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

      <MIModal isVisible={isModalVisible} toggleModal={toggleModalMI} />
      <CHFModal isVisible2={isModalVisible2} toggleModal={toggleModalCHF} />
    </View>
  );
};

export default HomeScreen;
