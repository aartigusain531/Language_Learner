
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const LANGUAGES = [
  { name: "English", flag: "🇬🇧", native: "English" },
  { name: "Spanish", flag: "🇪🇸", native: "Español" },
  { name: "French", flag: "🇫🇷", native: "Français" },
  { name: "Japanese", flag: "🇯🇵", native: "日本語" },
  { name: "German", flag: "🇩🇪", native: "Deutsch" },
  { name: "Korean", flag: "🇰🇷", native: "한국어" },
  { name: "Italian", flag: "🇮🇹", native: "Italiano" },
  { name: "Hindi", flag: "🇮🇳", native: "हिन्दी" },
  { name: "Thai", flag: "🇹🇭", native: "ภาษาไทย" },
  { name: "Dutch", flag: "🇳🇱", native: "Nederlands" },
];

export default function LanguagesScreen() {
  const [selectedLanguage, setSelectedLanguage] =
    useState("English");

  const { width } = useWindowDimensions();
  const compact = width < 370;

  const handleContinue = () => {
    router.push({
      pathname: "/goals",
      params: { language: selectedLanguage },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ece0f8"
      />

      {/* Decorative background */}
      <View pointerEvents="none" style={styles.backgroundDecor}>
        <View style={styles.pinkCircle} />
        <View style={styles.blueCircle} />
        <View style={styles.lavenderCircle} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: compact ? 15 : 24 },
        ]}
      >
        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Choose Your</Text>
          <Text style={styles.headingAccent}>Language</Text>
          <View style={styles.headingUnderline} />
          <Text style={styles.subtitle}>
            Select the language you want to learn.
          </Text>
        </View>

        {/* Language selection */}
        <View style={styles.languageGrid}>
          {LANGUAGES.map((language) => {
            const isSelected =
              selectedLanguage === language.name;

            return (
              <Pressable
                key={language.name}
                onPress={() =>
                  setSelectedLanguage(language.name)
                }
                accessibilityRole="button"
                accessibilityLabel={language.name}
                accessibilityState={{
                  selected: isSelected,
                }}
                style={({ pressed }) => [
                  styles.languageCard,
                  compact && styles.compactCard,
                  isSelected && styles.selectedCard,
                  pressed && styles.pressedCard,
                ]}
              >
                <Text style={styles.flag}>
                  {language.flag}
                </Text>

                <View style={styles.languageDetails}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.languageName,
                      isSelected && styles.selectedLanguageName,
                    ]}
                  >
                    {language.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={styles.nativeName}
                  >
                    {language.native}
                  </Text>
                </View>

                <View
                  style={[
                    styles.checkCircle,
                    !isSelected && styles.uncheckedCircle,
                  ]}
                >
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color="#FFFFFF"
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Continue button */}
        <Pressable
          onPress={handleContinue}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continuePressed,
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="#FFFFFF"
          />
        </Pressable>

        {/* Decorative dots */}
        <View style={styles.colorDots}>
          <View style={[styles.dot, { backgroundColor: "#F29ABF" }]} />
          <View style={[styles.dot, { backgroundColor: "#86CFF2" }]} />
          <View style={[styles.dot, { backgroundColor: "#B6A5F6" }]} />
          <View style={[styles.dot, { backgroundColor: "#fa934f" }]} />
          <View style={[styles.dot, { backgroundColor: "#79d4b6" }]} />
        </View>

        <Text style={styles.footer}>
          Every language opens a new world.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ece0f8",
  },

  backgroundDecor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },

  pinkCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f8cfe3",
    top: -85,
    right: -65,
  },

  blueCircle: {
    position: "absolute",
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: "#b7dff7",
    bottom: 70,
    left: -95,
  },

  lavenderCircle: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#d3c8f2",
    top: "40%",
    right: -48,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 30,
  },

  headingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  heading: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "900",
    color: "#29384F",
    textAlign: "center",
    letterSpacing: -0.8,
  },

  headingAccent: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "900",
    color: "#D85F9A",
    textAlign: "center",
    letterSpacing: -0.8,
  },

  headingUnderline: {
    width: 44,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#D85F9A",
    marginTop: 13,
  },

  subtitle: {
    fontSize: 13,
    color: "#77869A",
    marginTop: 12,
    textAlign: "center",
  },

  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
  },

  languageCard: {
    width: "48.3%",
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#B9E2FA",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 7,
  },

  compactCard: {
    paddingHorizontal: 6,
    gap: 5,
  },

  selectedCard: {
    backgroundColor: "#f8cfe3",
    borderColor: "#D85F9A",
    borderWidth: 1.5,
  },

  pressedCard: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },

  flag: {
    fontSize: 23,
  },

  languageDetails: {
    flex: 1,
    minWidth: 0,
  },

  languageName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#34445D",
  },

  selectedLanguageName: {
    color: "#813E76",
  },

  nativeName: {
    fontSize: 10,
    color: "#8998AC",
    marginTop: 4,
  },

  checkCircle: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#D85F9A",
    alignItems: "center",
    justifyContent: "center",
  },

  uncheckedCircle: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#B9E2FA",
  },

  continueButton: {
    marginTop: 22,
    minHeight: 55,
    borderRadius: 16,
    backgroundColor: "#D85F9A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: "#D85F9A",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  continuePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  continueText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  colorDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
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
