import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import LoginPage from "./login/loginPage";
import SignUpPage from "./signup/signUpPage";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  const [loading, setLoading] = useState(true); // State to handle loading spinner
  const [user, setUser] = useState<any>(null); // State to store the logged-in user

  // Effect to listen to authentication changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user state
      setLoading(false); // Stop loading when auth state is checked
    });
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // Show loading spinner while checking user state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user is logged in, return the main app layout; otherwise, show the LoginPage
  return user ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="loginPage" options={{ headerShown: false }} />
        <Stack.Screen name="signUpPage" options={{ title: "Sign Up" }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
        <Stack.Screen name="create-travel-plan" options={{ headerShown: false, }} />
        {/* Detail Pages */}
        <Stack.Screen name="activities/activity-details" options={{ title: "Activity Details" }} />
        <Stack.Screen name="destinations/destination-details" options={{ title: "Destination Details" }} />
      </Stack>
    </GestureHandlerRootView>
  ) : (
    <LoginPage />
  );
}