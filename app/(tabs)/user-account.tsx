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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

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
  "Learn to Cook Tradional SL Food": require("../../assets/images/activity6.jpeg"),
  "Scuba Diving at Arugam Bay": require("../../assets/images/activity7.jpeg"),
};

export default function UserAccount() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"Trips" | "Guides" | "Bookings">(
    "Trips"
  );
  const translateY = useSharedValue(0);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleGesture = (event: any) => {
    if (event.nativeEvent.translationY > 50) {
      translateY.value = withSpring(300);
      setTimeout(() => setSettingsVisible(false), 200);
    }
  };

  const handleGestureEnd = () => {
    translateY.value = withSpring(0);
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
      activity: "Learn to Cook Tradional SL Food",
      date: "Jan 15",
      serviceProvider: "Natali Cooks",
      image: "Learn to Cook Tradional SL Food",
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
        <Image
          source={require("../../assets/images/background-image.jpeg")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Zainab Shifan</Text>
        <Text style={styles.profileUsername}>@zainab205</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => console.log("Edit Profile Picture")}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profile: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
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








