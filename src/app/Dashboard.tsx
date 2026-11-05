
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const COLORS = {
  background: "#F5EFFA",
  white: "#FFFFFF",
  pink: "#D85F9A",
  softPink: "#F8CFE3",
  dark: "#29384F",
  muted: "#77869A",
};

type LanguageContent = {
  greeting: string;
  meaning: string;
  words: {
    word: string;
    translation: string;
  }[];
};

const languageContent: Record<string, LanguageContent> = {
  english: {
    greeting: "Hello!",
    meaning: "A friendly way to greet someone.",
    words: [
      { word: "Thank you", translation: "Expressing gratitude" },
      { word: "Please", translation: "A polite request" },
      { word: "Good morning", translation: "Morning greeting" },
    ],
  },

  japanese: {
    greeting: "こんにちは",
    meaning: "Hello / Good afternoon",
    words: [
      { word: "ありがとう", translation: "Thank you" },
      { word: "はい", translation: "Yes" },
      { word: "いいえ", translation: "No" },
    ],
  },

  korean: {
    greeting: "안녕하세요",
    meaning: "Hello",
    words: [
      { word: "감사합니다", translation: "Thank you" },
      { word: "네", translation: "Yes" },
      { word: "아니요", translation: "No" },
    ],
  },

  spanish: {
    greeting: "¡Hola!",
    meaning: "Hello",
    words: [
      { word: "Gracias", translation: "Thank you" },
      { word: "Sí", translation: "Yes" },
      { word: "No", translation: "No" },
    ],
  },

  french: {
    greeting: "Bonjour",
    meaning: "Hello / Good morning",
    words: [
      { word: "Merci", translation: "Thank you" },
      { word: "Oui", translation: "Yes" },
      { word: "Non", translation: "No" },
    ],
  },

  german: {
    greeting: "Hallo",
    meaning: "Hello",
    words: [
      { word: "Danke", translation: "Thank you" },
      { word: "Ja", translation: "Yes" },
      { word: "Nein", translation: "No" },
    ],
  },

  italian: {
    greeting: "Ciao",
    meaning: "Hello / Goodbye",
    words: [
      { word: "Grazie", translation: "Thank you" },
      { word: "Sì", translation: "Yes" },
      { word: "No", translation: "No" },
    ],
  },

  hindi: {
    greeting: "नमस्ते",
    meaning: "Hello",
    words: [
      { word: "धन्यवाद", translation: "Thank you" },
      { word: "हाँ", translation: "Yes" },
      { word: "नहीं", translation: "No" },
    ],
  },

  thai: {
    greeting: "สวัสดี",
    meaning: "Hello",
    words: [
      { word: "ขอบคุณ", translation: "Thank you" },
      { word: "ใช่", translation: "Yes" },
      { word: "ไม่", translation: "No" },
    ],
  },

  dutch: {
    greeting: "Hallo",
    meaning: "Hello",
    words: [
      { word: "Dank je", translation: "Thank you" },
      { word: "Ja", translation: "Yes" },
      { word: "Nee", translation: "No" },
    ],
  },
};

export default function DashboardScreen() {
  const { language, level, goals } = useLocalSearchParams<{
    language?: string | string[];
    level?: string | string[];
    goals?: string | string[];
  }>();

  const selectedLanguage = Array.isArray(language)
    ? language[0]
    : language || "English";

  const selectedLevel = Array.isArray(level)
    ? level[0]
    : level || "beginner";

  const normalizedLanguage = selectedLanguage
    .toLowerCase()
    .trim();

  const content =
    languageContent[normalizedLanguage] ||
    languageContent.english;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>Auvyant</Text>

          <View style={styles.profile}>
            <Text style={styles.profileText}>U</Text>
          </View>
        </View>

        {/* WELCOME */}
        <View style={styles.welcome}>
          <Text style={styles.title}>
            Welcome to Auvyant
          </Text>

          <Text style={styles.subtitle}>
            Small steps today, big dreams tomorrow.
          </Text>
        </View>

        {/* SELECTED LANGUAGE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your Learning Language
          </Text>

          <View style={styles.languageCard}>
            <Text style={styles.languageName}>
              {selectedLanguage}
            </Text>

            <Text style={styles.level}>
              Level: {selectedLevel}
            </Text>
          </View>
        </View>

        {/* DAILY PHRASE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Today's Phrase ✨
          </Text>

          <View style={styles.phraseCard}>
            <Text style={styles.phrase}>
              {content.greeting}
            </Text>

            <Text style={styles.meaning}>
              {content.meaning}
            </Text>
          </View>
        </View>

        {/* VOCABULARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Learn New Words 📚
          </Text>

          {content.words.map((item, index) => (
            <View key={index} style={styles.wordCard}>
              <Text style={styles.word}>
                {item.word}
              </Text>

              <Text style={styles.translation}>
                {item.translation}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 70,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },

  logo: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.pink,
  },

  profile: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.softPink,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: COLORS.pink,
    fontWeight: "bold",
  },

  welcome: {
    padding: 25,
    alignItems: "center",
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 10,
    textAlign: "center",
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },

  languageCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 18,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.pink,
  },

  languageName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  level: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 6,
    textTransform: "capitalize",
  },

  phraseCard: {
    backgroundColor: COLORS.softPink,
    padding: 22,
    borderRadius: 20,
    alignItems: "center",
  },

  phrase: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
  },

  meaning: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 10,
    textAlign: "center",
  },

  wordCard: {
    backgroundColor: COLORS.white,
    padding: 17,
    borderRadius: 15,
    marginBottom: 10,
  },

  word: {
    fontSize: 19,
    fontWeight: "bold",
    color: COLORS.pink,
  },

  translation: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 5,
  },
});
