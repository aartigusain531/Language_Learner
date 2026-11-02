
import React from "react";
import {
  View,
  Text,

  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FBFF" />

      <View style={styles.content}>
        {/* Decorative color accents */}
        <View style={styles.pinkCircle} />
        <View style={styles.blueCircle} />
        <View style={styles.lavenderCircle} />

        {/* App logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoLetter}>Auvyant</Text>
          </View>

          <Text style={styles.appName}>Auvyant</Text>
          <Text style={styles.tagline}>LANGUAGE LEARNING</Text>
        </View>

        {/* Welcome text */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            Say hello to a{"\n"}
            <Text style={styles.highlight}>whole new world.</Text>
          </Text>

          <Text style={styles.description}>
            Learn languages your way. Build new skills,
            discover cultures, and make every word count.
          </Text>

          {/* Small multicolor accents */}
          <View style={styles.colorDots}>
            <View style={[styles.dot, { backgroundColor: "#F29ABF" }]} />
            <View style={[styles.dot, { backgroundColor: "#86CFF2" }]} />
            <View style={[styles.dot, { backgroundColor: "#B6A5F6" }]} />
            <View style={[styles.dot, { backgroundColor: "#fa934f" }]} />
            <View style={[styles.dot, { backgroundColor: "#79d4b6" }]} />
          </View>
        </View>

        {/* Login and signup buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/Login")}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
            <Text style={styles.loginArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push("/signup")}
            activeOpacity={0.8}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Your next adventure starts here.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 180,
    overflow: "hidden",
  },

  pinkCircle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#f8cfe3",
    top: -75,
    right: -65,
  },

  blueCircle: {
    position: "absolute",
    width: 155,
    height: 155,
    borderRadius: 78,
    backgroundColor: "#b7dff7",
    bottom: 110,
    left: -105,
  },

  lavenderCircle: {
    position: "absolute",
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: "#d3c8f2",
    top: "37%",
    right: -55,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  logo: {
    width: 190,
    height: 76,
    borderRadius: 25,
    backgroundColor: "#F3B5D2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#D98AB3",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },

  logoLetter: {
    color: "#813E76",
    fontSize: 43,
    fontWeight: "900",
  },

  appName: {
    color: "#34445D",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 6,
    marginTop: 15,
  },

  tagline: {
    color: "#8998AC",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginTop: 7,
  },

  welcome: {
    width: "100%",
    alignItems: "center",
    marginVertical: 30,
  },

  welcomeTitle: {
    color: "#29384F",
    fontSize: 35,
    lineHeight: 45,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -1,
  },

  highlight: {
    color: "#D85F9A",
  },

  description: {
    color: "#77869A",
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
    marginTop: 18,
    maxWidth: 310,
  },

  colorDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 26,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  actions: {
    width: "100%",
    maxWidth: 390,
    marginBottom: 10,
  },

  loginButton: {
    height: 56,
    backgroundColor: "#D85F9A",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    shadowColor: "#D85F9A",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  loginArrow: {
    position: "absolute",
    right: 20,
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  signupButton: {
    height: 56,
    backgroundColor: "#E4F4FF",
    borderWidth: 1,
    borderColor: "#B9E2FA",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
  },

  signupButtonText: {
    color: "#367CA8",
    fontSize: 16,
    fontWeight: "800",
  },

  bottomText: {
    color: "#000000",
    fontSize: 12,
    textAlign: "center",
    marginTop: 22,
  },
});
