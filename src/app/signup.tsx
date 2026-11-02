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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing details", "Please fill in every field.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Weak password", "Use at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Please check both passwords.");
      return;
    }

    Alert.alert(
      "Almost there!",
      "Your form is valid. Connect your authentication service to create your account."
    );
  };

  const renderPasswordField = (
    label: string,
    value: string,
    setValue: (text: string) => void,
    visible: boolean,
    toggleVisible: () => void,
    placeholder: string
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#A69BB5"
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={toggleVisible} hitSlop={10}>
          <Text style={styles.showText}>{visible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
    </>
  );

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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>‹  Back</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <View style={styles.logo}>
                <Text style={styles.logoLetter}>A</Text>
                <View style={styles.logoDot} />
              </View>

              <Text style={styles.brand}>Auvyant</Text>
              <Text style={styles.tagline}>LANGUAGE LEARNING</Text>
            </View>

            <View style={styles.headingBlock}>
              <Text style={styles.heading}>Your journey</Text>
              <Text style={styles.headingSecond}>
                starts <Text style={styles.headingAccent}>here.</Text>
              </Text>
              <Text style={styles.subtitle}>
                Create an account and discover a world of languages.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Create account</Text>
              <Text style={styles.cardSubtitle}>
                Enter your details to get started.
              </Text>

              <Text style={styles.label}>Full name</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your full name"
                  placeholderTextColor="#A69BB5"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <Text style={styles.label}>Email address</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#A69BB5"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {renderPasswordField(
                "Password",
                password,
                setPassword,
                showPassword,
                () => setShowPassword(!showPassword),
                "At least 8 characters"
              )}

              {renderPasswordField(
                "Confirm password",
                confirmPassword,
                setConfirmPassword,
                showConfirmPassword,
                () => setShowConfirmPassword(!showConfirmPassword),
                "Enter password again"
              )}

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignup}
                activeOpacity={0.85}
              >
                <Text style={styles.signupButtonText}>Create Account</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </TouchableOpacity>

              <View style={styles.loginRow}>
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.replace("/Login")}
                >
                  <Text style={styles.loginLink}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF9FC",
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
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 10,
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8B72C7",
  },
  header: {
    alignItems: "center",
    marginBottom: 22,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#B6A5F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    elevation: 4,
  },
  logoLetter: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
  },
  logoDot: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#F6CE83",
    right: 3,
    top: 3,
    borderWidth: 2,
    borderColor: "#B6A5F6",
  },
  brand: {
    marginTop: 9,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#7965B4",
  },
  tagline: {
    marginTop: 3,
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: "700",
    color: "#A69BB5",
  },
  headingBlock: {
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#40364E",
    lineHeight: 36,
  },
  headingSecond: {
    fontSize: 30,
    fontWeight: "800",
    color: "#40364E",
    lineHeight: 36,
  },
  headingAccent: {
    color: "#D875A5",
  },
  subtitle: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: "#81768E",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 21,
    borderWidth: 1,
    borderColor: "#F0E8F7",
    elevation: 3,
    shadowColor: "#B6A5F6",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#40364E",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#94879F",
    marginTop: 5,
    marginBottom: 7,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#625571",
    marginTop: 15,
    marginBottom: 7,
  },
  inputBox: {
    height: 49,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E7DFF4",
    backgroundColor: "#FFFCFF",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#40364E",
  },
  passwordBox: {
    height: 49,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E7DFF4",
    backgroundColor: "#FFFCFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#40364E",
  },
  showText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#8B72C7",
    marginLeft: 8,
  },
  signupButton: {
    height: 52,
    marginTop: 24,
    borderRadius: 15,
    backgroundColor: "#de4b88",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  signupButtonText: {
    color: "#f3e5e5",
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  loginText: {
    fontSize: 12,
    color: "#81768E",
  },
  loginLink: {
    fontSize: 12,
    fontWeight: "800",
    color: "#8B72C7",
  },
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
    color: "#A69BB5",
    textAlign: "center",
  },
});
