import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Details", "Please enter your email and password.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        "userEmail",
        email.trim().toLowerCase()
      );
      router.replace("/dashboard");
    } catch {
      Alert.alert("Error", "Unable to save your details. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>T</Text>
        </View>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Log in to continue your language journey.
        </Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#A58A99"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#A58A99"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F9",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 28,
    borderRadius: 24,
    elevation: 5,
    shadowColor: "#40152D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#D63384",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    color: "#40152D",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#80566C",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 21,
  },
  label: {
    color: "#40152D",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#F0C7DA",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    color: "#40152D",
    backgroundColor: "#FFFAFC",
  },
  loginButton: {
    backgroundColor: "#D63384",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    alignItems: "center",
    marginTop: 24,
  },
  backText: {
    color: "#80566C",
    fontSize: 14,
  },
});
