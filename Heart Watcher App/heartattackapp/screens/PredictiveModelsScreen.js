// HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, Image, TouchableOpacity , Dimensions, Platform } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";


import styles from "../assets/stylesheets/PredictiveModelScreenStyles.js";
import MIModal from "../components/MIModal";
import CHFModal from "../components/CHFModal";

const PredictiveModelsScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const screenWidth = Dimensions.get("window").width;

    const toggleModalMI = () => {
    setIsModalVisible(!isModalVisible);
    };

    const toggleModalCHI = () => {
    setIsModalVisible2(!isModalVisible2);
    };    

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            
            <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
            </TouchableOpacity>
            <Text style={styles.title}>Predictive Models</Text>
            </View>
    

            <View>
                {/* Predictive Models */}
                <View style={styles.predictiveModelContainer}>
                    <View style={styles.predictiveModelHeader}>
                    <Text style={styles.predictiveModelTitle}>Models</Text>
                    </View>
                    <View style={styles.predictiveModelGrid}>
                    <View style={styles.predictiveModelCard}>
                        <TouchableOpacity onPress={toggleModalCHI}>
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

            <MIModal isVisible={isModalVisible} toggleModal={toggleModalMI} />
            <CHFModal isVisible2={isModalVisible2} toggleModal={toggleModalCHI} />
        </View>
    </KeyboardAvoidingView>

  );
};

export default PredictiveModelsScreen;
