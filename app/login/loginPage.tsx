import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { Image, type ImageSource } from "expo-image";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/"); // Navigate to the main app layout (Tabs)
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = () => {
    router.push("/login/forgotPasswordPage"); // Navigate to the Forgot Password page
  };

  return (
    <View style={styles.container}>
      {/* App Icon/Logo */}
      <Image
        source={require("../../assets/images/logo.png")} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.title}>PlanIt</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Log In Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Social Login Buttons */}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="facebook" size={24} color="#3b5998" style={{ marginRight: 10 }} />
        <Text style={styles.socialText}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={24} color="#db4437" style={{ marginRight: 10 }} />
        <Text style={styles.socialText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-apple" size={24} color="#000" style={{ marginRight: 10 }} />
        <Text style={styles.socialText}>Sign in with Apple</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => router.push("/signup/signUpPage")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: {
    width: 100, // Adjust width as needed
    height: 80, // Adjust height as needed
    marginBottom: 10, // Add spacing between the logo and the title
    resizeMode: "contain", // Ensure the logo scales proportionally
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25, // Rounded corners
    padding: 15, // Increased padding
    marginVertical: 10,
    backgroundColor: "#fff", // White background for fields
    color: "#333", // Dark text for input
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end", // Aligns the container to the right side
    marginBottom: 10, // Adds spacing below the password field
  },
  forgotPassword: {
    color: "#007BFF",
    alignSelf: "flex-end", // Align to the right
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF6347", // Orange background
    padding: 15,
    borderRadius: 25, // Rounded corners
    marginTop: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  socialButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  link: { color: "#007BFF", marginTop: 10 },
  error: { color: "red", marginBottom: 10 },
});

export default LoginPage;
