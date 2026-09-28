import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>TRAGO</Text>
        </View>

        {/* Welcome */}
        <Text style={styles.welcome}>WELCOME TO TRAGO</Text>

        {/* Main heading */}
        <Text style={styles.heading}>
          Learn a Language.{"\n"}
          <Text style={styles.headingPink}>Open a New World.</Text>
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Hello, Language Learner! 👋{"\n"}
          Start your learning journey and build your skills step by step.
        </Text>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("./login")}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.signupButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("./signup")}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </Pressable>
        </View>

        {/* Bottom text */}
        <Text style={styles.bottomText}>
          Your language journey starts here ✦
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 25,
  },

  topCircle: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "#f6a8ca",
    top: -170,
    right: -120,
    opacity: 0.45,
  },

  bottomCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#e83e8c",
    bottom: -180,
    left: -120,
    opacity: 0.15,
  },

  content: {
    width: "100%",
    maxWidth: 750,
    alignItems: "center",
    zIndex: 2,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#d63384",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,

    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },

  logoText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  welcome: {
    color: "#d63384",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 20,
    textAlign: "center",
  },

  heading: {
    color: "#40152d",
    fontSize: width < 600 ? 44 : 60,
    lineHeight: width < 600 ? 50 : 66,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -1,
    marginBottom: 25,
  },

  headingPink: {
    color: "#d63384",
  },

  description: {
    maxWidth: 570,
    color: "#80566c",
    fontSize: 17,
    lineHeight: 29,
    textAlign: "center",
  },

  buttons: {
    flexDirection: width < 600 ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    marginTop: 40,
  },

  loginButton: {
    width: width < 600 ? 220 : 160,
    paddingVertical: 16,
    borderRadius: 15,
    backgroundColor: "#d63384",

    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  signupButton: {
    width: width < 600 ? 220 : 160,
    paddingVertical: 14,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e83e8c",
  },

  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  signupText: {
    color: "#d63384",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  bottomText: {
    marginTop: 35,
    color: "#a87591",
    fontSize: 14,
    textAlign: "center",
  },
});
