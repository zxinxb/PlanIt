import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // Ensure this points to your Firebase configuration
import { useRouter } from "expo-router";


// Define types for navigation routes
type RootStackParamList = {
  Settings: undefined;
  UserAccount: undefined;
};

type Trip = {
  id: string;
  name: string;
  date: string;
  image: string;
};

type Guide = {
  id: string;
  name: string;
  image: string;
};

type Booking = {
  id: string;
  activity: string;
  date: string;
  serviceProvider: string;
  image: string;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

const imageMapping: { [key: string]: any } = {
  "Trip to Ella": require("../../assets/images/destination8.jpeg"),
  "Trip to Mirissa": require("../../assets/images/destination12.jpeg"),
  "Nuwara Eliya Guide": require("../../assets/images/destination2.jpeg"),
  "Learn to Cook Traditional SL Food": require("../../assets/images/activity6.jpeg"),
  "Scuba Diving at Arugam Bay": require("../../assets/images/activity7.jpeg"),
};

export default function UserAccount() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"Trips" | "Guides" | "Bookings">(
    "Trips"
  );
  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image
  const translateY = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out
      router.replace("../../login/loginPage"); // Navigate to Login Page
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  

  const handleGesture = (event: any) => {
    if (event.nativeEvent.translationY > 50) {
      translateY.value = withSpring(300);
      setTimeout(() => setSettingsVisible(false), 200);
    }
  };

  const handleGestureEnd = () => {
    translateY.value = withSpring(0);
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });  //this allows us to select images

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Set the selected image URI as profile image
    } else {
      alert("You did not select any image.");
    }
  };

  const [trips] = useState<Trip[]>([
    { id: "1", name: "Trip to Ella", date: "Jan 14 - 17", image: "Trip to Ella" },
    { id: "2", name: "Trip to Mirissa", date: "Feb 12 - 15", image: "Trip to Mirissa" },
  ]);
  const [guides] = useState<Guide[]>([
    { id: "1", name: "Nuwara Eliya Guide", image: "Nuwara Eliya Guide" },
  ]);
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      activity: "Learn to Cook Traditional SL Food",
      date: "Jan 15",
      serviceProvider: "Natali Cooks",
      image: "Learn to Cook Traditional SL Food",
    },
    {
      id: "2",
      activity: "Scuba Diving at Arugam Bay",
      date: "Jan 20",
      serviceProvider: "Colombo Adventures",
      image: "Scuba Diving at Arugam Bay",
    },
  ]);

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profile}>
  <TouchableOpacity style={styles.imageWrapper} onPress={pickProfileImage}>
    <Image
      source={
        profileImage
          ? { uri: profileImage } // Selected profile image
          : require("../../assets/images/activity1.jpeg") // Default profile image
      }
      style={styles.profileImage}
    />
    {/* Pen Icon */}
    <View style={styles.editIconWrapper}>
      <Ionicons name="pencil" size={18} color="#fff" />
    </View>
  </TouchableOpacity>
  <Text style={styles.profileName}>Zainab Shifan</Text>
  <Text style={styles.profileUsername}>@zainab205</Text>
</View>


      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "Trips" && styles.activeTab]}
          onPress={() => setSelectedTab("Trips")}
        >
          <Text>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "Guides" && styles.activeTab]}
          onPress={() => setSelectedTab("Guides")}
        >
          <Text>Guides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "Bookings" && styles.activeTab]}
          onPress={() => setSelectedTab("Bookings")}
        >
          <Text>My Bookings</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <FlatList
        data={
          selectedTab === "Trips"
            ? trips
            : selectedTab === "Guides"
            ? guides
            : bookings
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Trip | Guide | Booking }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={imageMapping[item.image]} // Map image dynamically
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {"activity" in item ? item.activity : item.name}
              </Text>
              {"date" in item && <Text style={styles.cardDate}>{item.date}</Text>}
              {"serviceProvider" in item && (
                <Text style={styles.cardSubTitle}>{item.serviceProvider}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          setSettingsVisible(true);
          translateY.value = withSpring(0); // Reset modal position when opening
        }}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal visible={settingsVisible} animationType="none" transparent>
        <BlurView intensity={50} style={styles.blurView}>
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onEnded={handleGestureEnd}
          >
            <Animated.View style={[styles.modal, modalAnimatedStyle]}>
              <View style={styles.dragHandle} />
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => navigation.navigate("Settings")}
              >
                <Ionicons
                  name="settings-outline"
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.modalText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => console.log("Help & How-To")}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.modalText}>Help & How-To</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => console.log("Feedback & Support")}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.modalText}>Feedback & Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalItem} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} style={styles.icon} />
                <Text style={styles.modalText}>Logout</Text>
              </TouchableOpacity>

            </Animated.View>
          </PanGestureHandler>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profile: { alignItems: "center", marginBottom: 20 },
  imageWrapper: {
    position: "relative",
  },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  editIconWrapper: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#FF6347", // Background color of the pen icon
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff", // Optional border for contrast
  },
  profileName: { fontSize: 18, fontWeight: "bold" },
  profileUsername: { fontSize: 14, color: "#666" },
  tabs: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  tab: { padding: 10, marginHorizontal: 5 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#FF6347" },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 10,
  },
  cardImage: { width: 60, height: 60, marginRight: 10, borderRadius: 5 },
  cardContent: { justifyContent: "center" },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardDate: { fontSize: 14, color: "#666" },
  cardSubTitle: { fontSize: 12, color: "#999" },
  settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  blurView: { flex: 1, justifyContent: "flex-end" },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "50%",
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 5,
  },
  modalItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  modalText: { fontSize: 18, marginLeft: 10 },
  icon: { color: "#000" },
  editButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
});










