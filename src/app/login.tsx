import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>TRAGO</Text>
        </View>

        <Text style={styles.title}>Welcome Back!</Text>

        <Text style={styles.subtitle}>
          Continue your language learning journey.
        </Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#b995a7"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#b995a7"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Login */}
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        {/* Sign up */}
        <View style={styles.signupRow}>
          <Text style={styles.signupQuestion}>Don't have an account?</Text>

          <Pressable onPress={() => router.push("./signup")}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </Pressable>
        </View>

        {/* Back */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.backText}>← Back to Home</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f9",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 30,

    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#d63384",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  logoText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },

  title: {
    color: "#40152d",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#80566c",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    color: "#4a1832",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#f0c1d5",
    borderRadius: 13,
    paddingHorizontal: 15,
    color: "#4a1832",
    backgroundColor: "#fffafd",
    fontSize: 15,
  },

  loginButton: {
    height: 52,
    borderRadius: 13,
    backgroundColor: "#d63384",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  signupQuestion: {
    color: "#80566c",
    fontSize: 14,
  },

  signupLink: {
    color: "#d63384",
    fontSize: 14,
    fontWeight: "700",
  },

  backButton: {
    alignItems: "center",
    marginTop: 25,
  },

  backText: {
    color: "#a87591",
    fontSize: 14,
  },
});
