
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing Details", "Please fill in all fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Your password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Your passwords do not match.");
      return;
    }

    try {
      await AsyncStorage.multiSet([
        ["userName", name.trim()],
        ["userEmail", email.trim().toLowerCase()],
      ]);

      Alert.alert("Success", "Your account details have been saved!");

      router.replace("/dashboard");
    } catch {
      Alert.alert("Error", "Unable to save your details. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>T</Text>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join TRAGO and start learning a new language!
          </Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#A58A99"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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
            placeholder="Create a password"
            placeholderTextColor="#A58A99"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            placeholderTextColor="#A58A99"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </Pressable>

          <View style={styles.row}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.link}>Login</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.replace("/")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back to Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F9",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 430,
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
    marginBottom: 24,
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
    marginBottom: 18,
    color: "#40152D",
    backgroundColor: "#FFFAFC",
  },
  signupButton: {
    backgroundColor: "#D63384",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 24,
  },
  bottomText: {
    color: "#80566C",
    fontSize: 14,
  },
  link: {
    color: "#D63384",
    fontWeight: "bold",
    fontSize: 14,
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