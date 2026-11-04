import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 const handleLogin = () => {
  if (!email.trim() || !password) {
    Alert.alert("Missing details", "Please enter your email and password.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    Alert.alert("Invalid email", "Please enter a valid email address.");
    return;
  }

  // Open language selection page
  router.replace("/language");
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.page}>
            {/* Decorative circles */}
            <View style={styles.pinkCircle} />
            <View style={styles.blueCircle} />
            <View style={styles.lavenderCircle} />

            {/* Back button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>‹ Back</Text>
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.header}>
              <View style={styles.logo}>
                <Text style={styles.logoLetter}>A</Text>
                <View style={styles.logoDot} />
              </View>

              <Text style={styles.brand}>Auvyant</Text>
              <Text style={styles.tagline}>LANGUAGE LEARNING</Text>
            </View>

            {/* Heading */}
            <View style={styles.headingBlock}>
              <Text style={styles.heading}>Welcome</Text>

              <Text style={styles.headingSecond}>
                <Text style={styles.headingAccent}>back.</Text>
              </Text>

              <Text style={styles.subtitle}>
                Continue your language-learning journey with us.
              </Text>
            </View>

            {/* Login Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Log in</Text>

              <Text style={styles.cardSubtitle}>
                Enter your details to access your account.
              </Text>

              {/* Email */}
              <Text style={styles.label}>Email address</Text>

              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#8998AC"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password */}
              <Text style={styles.label}>Password</Text>

              <View style={styles.passwordBox}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#8998AC"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={10}
                >
                  <Text style={styles.showText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Forgot password */}
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() =>
                  Alert.alert(
                    "Forgot password?",
                    "Password reset will be available after authentication is connected."
                  )
                }
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              {/* Login button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>Log In</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </TouchableOpacity>

              {/* Signup link */}
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                </Text>

                <TouchableOpacity
                  onPress={() => router.replace("/signup")}
                >
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Color accents */}
            <View style={styles.colorDots}>
              <View style={[styles.dot, { backgroundColor: "#F29ABF" }]} />
              <View style={[styles.dot, { backgroundColor: "#86CFF2" }]} />
              <View style={[styles.dot, { backgroundColor: "#B6A5F6" }]} />
              <View style={[styles.dot, { backgroundColor: "#fa934f" }]} />
              <View style={[styles.dot, { backgroundColor: "#79d4b6" }]} />
            </View>

            <Text style={styles.footer}>
              Every word takes you somewhere new.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ece0f8",
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  page: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 25,
    alignItems: "center",
    overflow: "hidden",
  },

  /* Decorative circles */
  pinkCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f8cfe3",
    top: -65,
    right: -65,
  },

  blueCircle: {
    position: "absolute",
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: "#b7dff7",
    bottom: 90,
    left: -95,
  },

  lavenderCircle: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#d3c8f2",
    top: "38%",
    right: -48,
  },

  /* Back button */
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 10,
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#813E76",
  },

  /* Logo */
  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#F3B5D2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#D98AB3",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  logoLetter: {
    color: "#813E76",
    fontSize: 30,
    fontWeight: "900",
  },

  logoDot: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#fa934f",
    right: 3,
    top: 3,
    borderWidth: 2,
    borderColor: "#F3B5D2",
  },

  brand: {
    marginTop: 9,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#34445D",
  },

  tagline: {
    marginTop: 3,
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: "700",
    color: "#8998AC",
  },

  /* Heading */
  headingBlock: {
    width: "100%",
    marginBottom: 25,
  },

  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: "#29384F",
    lineHeight: 39,
  },

  headingSecond: {
    fontSize: 32,
    fontWeight: "800",
    color: "#29384F",
    lineHeight: 39,
  },

  headingAccent: {
    color: "#D85F9A",
  },

  subtitle: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: "#77869A",
  },

  /* Login card */
  card: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 21,
    borderWidth: 1,
    borderColor: "#B9E2FA",
    elevation: 3,
    shadowColor: "#D98AB3",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#29384F",
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#77869A",
    marginTop: 5,
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#34445D",
    marginTop: 17,
    marginBottom: 7,
  },

  /* Inputs */
  inputBox: {
    height: 51,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#B9E2FA",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#29384F",
  },

  passwordBox: {
    height: 51,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#B9E2FA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#29384F",
  },

  showText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#367CA8",
    marginLeft: 8,
  },

  /* Forgot password */
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 12,
  },

  forgotText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#367CA8",
  },

  /* Login button */
  loginButton: {
    height: 52,
    marginTop: 25,
    borderRadius: 15,
    backgroundColor: "#D85F9A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#D85F9A",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  buttonArrow: {
    position: "absolute",
    right: 18,
    fontSize: 21,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  /* Signup link */
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 22,
  },

  signupText: {
    fontSize: 12,
    color: "#77869A",
  },

  signupLink: {
    fontSize: 12,
    fontWeight: "800",
    color: "#367CA8",
  },

  /* Footer */
  colorDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 25,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  footer: {
    marginTop: 10,
    fontSize: 11,
    color: "#8998AC",
    textAlign: "center",
  },
});
