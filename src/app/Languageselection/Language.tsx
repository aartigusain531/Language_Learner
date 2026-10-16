
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const LANGUAGES = [
  { name: "English", flag: "🇬🇧" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
  { name: "German", flag: "🇩🇪" },
  { name: "Chinese", flag: "🇨🇳" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Arabic", flag: "🇸🇦" },
  { name: "Russian", flag: "🇷🇺" },
  { name: "Portuguese", flag: "🇵🇹" },
  { name: "Dutch", flag: "🇳🇱" },
  { name: "Turkish", flag: "🇹🇷" },
  { name: "Hindi", flag: "🇮🇳" },
  { name: "Bengali", flag: "🇧🇩" },
  { name: "Urdu", flag: "🇵🇰" },
  { name: "Thai", flag: "🇹🇭" },
  { name: "Vietnamese", flag: "🇻🇳" },
  { name: "Greek", flag: "🇬🇷" },
  { name: "Swedish", flag: "🇸🇪" },
];

export default function LanguagesScreen() {
  const [selectedLanguage, setSelectedLanguage] =
    useState("English");
  const [search, setSearch] = useState("");

  const filteredLanguages = useMemo(
    () =>
      LANGUAGES.filter((language) =>
        language.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const handleContinue = () => {
    if (!selectedLanguage) {
      Alert.alert("Choose a language", "Please select a language first.");
      return;
    }

    // Pass the selected language to the next screen.
    router.push({
      pathname: "/Dashboard",
      params: { language: selectedLanguage },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* App branding */}
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <Ionicons name="globe-outline" size={30} color="#FFFFFF" />
          </View>
          <Text style={styles.brandText}>Language Learner</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingContainer}>
          <View style={styles.headingLine} />
          <Text style={styles.heading}>Choose Languages</Text>
          <Text style={styles.subtitle}>
            Select a language you want to learn{"\n"}
            and start your journey!
          </Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color="#7183A3" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={21} color="#94A3B8" />
            </Pressable>
          )}
        </View>

        {/* Language cards */}
        <View style={styles.languageGrid}>
          {filteredLanguages.map((language) => {
            const isSelected = selectedLanguage === language.name;

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
                <Text style={styles.flag}>{language.flag}</Text>

                <Text
                  numberOfLines={1}
                  style={[
                    styles.languageName,
                    isSelected && styles.selectedLanguageName,
                  ]}
                >
                  {language.name}
                </Text>

                <Ionicons
                  name={isSelected ? "checkmark-circle" : "chevron-forward"}
                  size={21}
                  color={isSelected ? "#3478F6" : "#94A3B8"}
                />
              </Pressable>
            );
          })}
        </View>

        {filteredLanguages.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={35} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No languages found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching for another language.
            </Text>
          </View>
        )}

        {/* Selected language */}
        <View style={styles.selectionInfo}>
          <Ionicons name="checkmark-circle" size={19} color="#3478F6" />
          <Text style={styles.selectionText}>
            Selected: {selectedLanguage}
          </Text>
        </View>

        {/* Continue button */}
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continuePressed,
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.footer}>
          Your language-learning journey starts here.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 34,
    gap: 10,
  },
  logoCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#3478F6",
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 19,
    fontWeight: "800",
    color: "#17366F",
    letterSpacing: 0.2,
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 26,
  },
  headingLine: {
    width: 48,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#3478F6",
    marginBottom: 17,
  },
  heading: {
    fontSize: 29,
    fontWeight: "800",
    color: "#142D59",
    textAlign: "center",
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#7183A3",
    textAlign: "center",
    marginTop: 10,
  },
  searchBox: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E9F8",
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: "#142D59",
    fontSize: 15,
    paddingVertical: 12,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  languageCard: {
    width: "48.3%",
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E5ECF8",
    borderRadius: 17,
    paddingHorizontal: 10,
    gap: 8,
  },
  selectedCard: {
    backgroundColor: "#EAF2FF",
    borderColor: "#3478F6",
  },
  pressedCard: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  flag: {
    fontSize: 25,
  },
  languageName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#263B60",
  },
  selectedLanguageName: {
    color: "#2463D8",
    fontWeight: "800",
  },
  selectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 22,
    marginBottom: 16,
  },
  selectionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#526789",
  },
  continueButton: {
    minHeight: 56,
    backgroundColor: "#3478F6",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    elevation: 3,
    shadowColor: "#3478F6",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  continuePressed: {
    backgroundColor: "#2463D8",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 35,
  },
  emptyTitle: {
    color: "#263B60",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 12,
  },
  emptySubtitle: {
    color: "#7183A3",
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#8493AC",
    marginTop: 19,
  },
});
