
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.circle} />

      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>TRAGO</Text>
        </View>

        <Text style={styles.welcome}>WELCOME TO TRAGO</Text>

        <Text style={styles.heading}>
          Learn a Language.{"\n"}
          <Text style={styles.pink}>Open a New World.</Text>
        </Text>

        <Text style={styles.description}>
          Hello, Language Learner! 👋{"\n"}
          Start your learning journey and build your skills step by step.
        </Text>

        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.signupButton}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </Pressable>

        <Text style={styles.footer}>
          Your language journey starts here ✦
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F6A8CA",
    top: -150,
    right: -100,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    alignItems: "center",
  },
  logo: {
    backgroundColor: "#D63384",
    width: 70,
    height: 70,
    borderRadius: 22,
    
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,

  },

  logoText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  welcome: {
    color: "#D63384",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 18,
  },

  heading: {
    color: "#40152D",
    fontSize: width < 600 ? 32 : 45,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  pink: {
    color: "#D63384",
  },

  description: {
    color: "#80566C",
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 30,
  },

  loginButton: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#D63384",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#D63384",
    padding: 14,
    borderRadius: 14,
  },
  signupText: {
    color: "#D63384",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    color: "#A87591",
    fontSize: 13,
    marginTop: 30,
    textAlign: "center",
  },
});