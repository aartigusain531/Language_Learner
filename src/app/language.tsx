
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
  { name: "Japanese", flag: "🇯🇵", native: "日本語" },
  { name: "French", flag: "🇫🇷", native: "Français" },
  { name: "Korean", flag: "🇰🇷", native: "한국어" },
  { name: "Spanish", flag: "🇪🇸", native: "Español" },
  { name: "Hindi", flag: "🇮🇳", native: "हिन्दी" },
  { name: "German", flag: "🇩🇪", native: "Deutsch" },
  { name: "Thai", flag: "🇹🇭", native: "ภาษาไทย" },
  { name: "Italian", flag: "🇮🇹", native: "Italiano" },
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
        backgroundColor="#2678F3"
      />

      {/* Blue outer background and white rounded panel */}
      <View
        pointerEvents="none"
        style={styles.backgroundDecor}
      >
        <View style={styles.whitePanel} />
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
                      isSelected &&
                        styles.selectedLanguageName,
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
          <Text style={styles.continueText}>
            Continue
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="#FFFFFF"
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2678F3",
  },

  backgroundDecor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
  },

  whitePanel: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 38,
    borderWidth: 1,
    borderColor: "#DCEAFF",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 35,
    paddingBottom: 35,
  },

  headingContainer: {
    alignItems: "center",
    marginBottom: 38,
  },

  heading: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "900",
    color: "#172D56",
    textAlign: "center",
    letterSpacing: -0.8,
  },

  headingAccent: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "900",
    color: "#2678F3",
    textAlign: "center",
    letterSpacing: -0.8,
  },

  headingUnderline: {
    width: 44,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#80B7FF",
    marginTop: 13,
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
    backgroundColor: "#E9EDF4",
    borderWidth: 1.5,
    borderColor: "#E9EDF4",
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
    backgroundColor: "#D6E7FF",
    borderColor: "#2678F3",
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
    color: "#344766",
  },

  selectedLanguageName: {
    color: "#1859B8",
  },

  nativeName: {
    fontSize: 10,
    color: "#8998B0",
    marginTop: 4,
  },

  checkCircle: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#2678F3",
    alignItems: "center",
    justifyContent: "center",
  },

  uncheckedCircle: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#C5D2E5",
  },

  continueButton: {
    marginTop: 32,
    minHeight: 55,
    borderRadius: 16,
    backgroundColor: "#2678F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
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
});
