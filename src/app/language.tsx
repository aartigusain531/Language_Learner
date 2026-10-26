
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
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

  const handleContinue = () => {
    router.push({
      pathname: "/goals",
      params: { language: selectedLanguage },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FF" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <Ionicons name="globe-outline" size={29} color="#FFFFFF" />
          </View>
          <Text style={styles.brandText}>Language Learner</Text>
        </View>

        {/* Beautiful heading */}
        <View style={styles.headingContainer}>
          <View style={styles.headingLine} />

          <Text style={styles.eyebrow}>YOUR NEXT ADVENTURE</Text>

          <Text style={styles.heading}>
            Choose Your{"\n"}
            <Text style={styles.headingAccent}>Language</Text>
          </Text>

          <Text style={styles.subtitle}>
            Discover a new world, one word at a time.
          </Text>
        </View>

        {/* Language boxes */}
        <View style={styles.languageGrid}>
          {LANGUAGES.map((language, index) => {
            const isSelected =
              selectedLanguage === language.name;

            return (
              <Pressable
                key={language.name}
                onPress={() => setSelectedLanguage(language.name)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                style={({ pressed }) => [
                  styles.languageCard,
                  isSelected && styles.selectedCard,
                  pressed && styles.pressedCard,
                ]}
              >
                <View style={styles.cardTop}>
                  <View
                    style={[
                      styles.flagCircle,
                      isSelected && styles.selectedFlagCircle,
                    ]}
                  >
                    <Text style={styles.flag}>{language.flag}</Text>
                  </View>

                  <Ionicons
                    name={
                      isSelected
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={22}
                    color={isSelected ? "#3478F6" : "#CBD5E7"}
                  />
                </View>

                <Text
                  style={[
                    styles.languageName,
                    isSelected && styles.selectedLanguageName,
                  ]}
                >
                  {language.name}
                </Text>

                <Text
                  style={[
                    styles.nativeName,
                    isSelected && styles.selectedNativeName,
                  ]}
                >
                  {language.native}
                </Text>

                <View
                  style={[
                    styles.cardBottomLine,
                    isSelected && styles.selectedCardBottomLine,
                  ]}
                />
              </Pressable>
            );
          })}
        </View>

        {/* Selected language */}
        <View style={styles.selectionInfo}>
          <Ionicons
            name="checkmark-circle"
            size={19}
            color="#3478F6"
          />
          <Text style={styles.selectionText}>
            Selected: {selectedLanguage}
          </Text>
        </View>

        {/* Continue */}
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continuePressed,
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons
            name="arrow-forward"
            size={21}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.footer}>
          A new language. A new perspective.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#F7F9FF",
    },
    container: {
      paddingHorizontal: 22,
      paddingTop: 18,
      paddingBottom: 25,
    },
  
    // Brand
    brand: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      marginBottom: 25,
    },
    logoCircle: {
      width: 38,
      height: 38,
      borderRadius: 13,
      backgroundColor: "#3478F6",
      alignItems: "center",
      justifyContent: "center",
    },
    brandText: {
      fontSize: 17,
      fontWeight: "800",
      color: "#18376C",
      letterSpacing: 0.2,
    },
  
    // Heading
    headingContainer: {
      alignItems: "center",
      marginBottom: 23,
    },
    headingLine: {
      width: 38,
      height: 4,
      borderRadius: 5,
      backgroundColor: "#3478F6",
      marginBottom: 13,
    },
    eyebrow: {
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 2.5,
      color: "#6480B3",
      marginBottom: 8,
    },
    heading: {
      fontSize: 32,
      lineHeight: 38,
      fontWeight: "900",
      color: "#142D59",
      textAlign: "center",
      letterSpacing: -0.8,
    },
    headingAccent: {
      color: "#3478F6",
      fontWeight: "900",
      fontStyle: "italic",
    },
    subtitle: {
      fontSize: 13,
      color: "#7B8AA8",
      textAlign: "center",
      marginTop: 9,
      lineHeight: 19,
    },
  
    // Compact language boxes
    languageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 10,
    },
    languageCard: {
      width: "48.3%",
      minHeight: 66,
      backgroundColor: "#FFFFFF",
      borderWidth: 1.3,
      borderColor: "#E5EAF5",
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 9,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    selectedCard: {
      backgroundColor: "#EAF2FF",
      borderColor: "#3478F6",
    },
    pressedCard: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    cardTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 0,
    },
    flagCircle: {
      width: 37,
      height: 37,
      borderRadius: 12,
      backgroundColor: "#F3F6FC",
      alignItems: "center",
      justifyContent: "center",
    },
    selectedFlagCircle: {
      backgroundColor: "#FFFFFF",
    },
    flag: {
      fontSize: 23,
    },
    languageName: {
      flex: 1,
      fontSize: 13,
      fontWeight: "700",
      color: "#253A60",
      letterSpacing: -0.2,
    },
    selectedLanguageName: {
      color: "#2463D8",
    },
    nativeName: {
      display: "none",
    },
    selectedNativeName: {
      color: "#5379BC",
    },
    cardBottomLine: {
      display: "none",
    },
    selectedCardBottomLine: {
      backgroundColor: "#3478F6",
    },
  
    // Selection status
    selectionInfo: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      marginTop: 19,
      marginBottom: 13,
    },
    selectionText: {
      fontSize: 13,
      color: "#526789",
      fontWeight: "700",
    },
  
    // Continue button
    continueButton: {
      minHeight: 51,
      backgroundColor: "#3478F6",
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      elevation: 3,
      shadowColor: "#3478F6",
      shadowOpacity: 0.18,
      shadowRadius: 7,
      shadowOffset: { width: 0, height: 3 },
    },
    continuePressed: {
      backgroundColor: "#245FCC",
    },
    continueText: {
      fontSize: 15,
      color: "#FFFFFF",
      fontWeight: "800",
    },
    footer: {
      textAlign: "center",
      fontSize: 11,
      color: "#91A0B9",
      marginTop: 15,
    },
  });
  