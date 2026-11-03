
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const COLORS = {
  background: "#ece0f8",
  white: "#FFFFFF",
  pink: "#D85F9A",
  softPink: "#f8cfe3",
  skyBlue: "#b7dff7",
  lavender: "#d3c8f2",
  dark: "#29384F",
  muted: "#77869A",
  border: "#B9E2FA",
  light: "#F8F5FC",
};

const levels = [
  {
    id: "beginner",
    emoji: "🌱",
    title: "Beginner",
    description: "I'm starting from zero",
    color: "#E7F8EE",
  },
  {
    id: "elementary",
    emoji: "🌼",
    title: "Elementary",
    description: "I know a few basic words",
    color: "#FFF1DC",
  },
  {
    id: "intermediate",
    emoji: "🚀",
    title: "Intermediate",
    description: "I can chat, but need practice",
    color: "#F0E9FF",
  },
  {
    id: "advanced",
    emoji: "👑",
    title: "Advanced",
    description: "I'm ready for fluent conversations",
    color: "#FCE7F3",
  },
];

export default function LevelScreen() {
  const router = useRouter();

  const { language, goals } = useLocalSearchParams<{
    language?: string;
    goals?: string;
  }>();

  const [selected, setSelected] = useState("beginner");

  const continueNext = () => {
    router.push({
      pathname: "/Dashboard",
      params: {
        language: language || "English",
        goals: goals || JSON.stringify([]),
        level: selected,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Navigation */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.step}>STEP 3 OF 3</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>

        {/* Heading */}
        <Text style={styles.eyebrow}>YOUR LEARNING JOURNEY</Text>

        <Text style={styles.title}>
          What's your{"\n"}current level?
        </Text>

        <Text style={styles.subtitle}>
          No pressure! Choose the level that feels right for you.
        </Text>

        {/* Level Options */}
        <View style={styles.levelList}>
          {levels.map((level) => {
            const active = selected === level.id;

            return (
              <TouchableOpacity
                key={level.id}
                activeOpacity={0.85}
                onPress={() => setSelected(level.id)}
                style={[
                  styles.card,
                  active && styles.activeCard,
                ]}
              >
                <View
                  style={[
                    styles.emojiBox,
                    { backgroundColor: level.color },
                  ]}
                >
                  <Text style={styles.emoji}>{level.emoji}</Text>
                </View>

                <View style={styles.cardText}>
                  <Text style={styles.levelTitle}>
                    {level.title}
                  </Text>

                  <Text style={styles.description}>
                    {level.description}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radio,
                    active && styles.activeRadio,
                  ]}
                >
                  {active && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Helpful Tip */}
        <View style={styles.tip}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            You can change your level anytime as you improve.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={continueNext}
        >
          <Text style={styles.continueText}>
            Let's start learning
          </Text>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          YOUR JOURNEY, YOUR PACE ✨
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 23,
    paddingTop: 12,
    paddingBottom: 28,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.softPink,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 32,
    color: COLORS.dark,
    lineHeight: 35,
  },

  step: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: COLORS.pink,
  },

  placeholder: {
    width: 43,
  },

  progressTrack: {
    height: 6,
    borderRadius: 10,
    backgroundColor: COLORS.softPink,
    marginTop: 20,
    marginBottom: 35,
    overflow: "hidden",
  },

  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.pink,
    borderRadius: 10,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#1a76a1",
    marginBottom: 10,
  },

  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.muted,
    marginTop: 12,
    marginBottom: 27,
  },

  levelList: {
    gap: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: "#E8DDF3",
    padding: 15,
    minHeight: 104,
  },

  activeCard: {
    borderColor: COLORS.pink,
    borderWidth: 2,
    backgroundColor: "#FFF9FC",
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  emojiBox: {
    width: 60,
    height: 60,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 31,
  },

  cardText: {
    flex: 1,
    marginLeft: 14,
  },

  levelTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.dark,
  },

  description: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.muted,
    marginTop: 5,
  },

  radio: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.8,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  activeRadio: {
    borderColor: COLORS.pink,
  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.pink,
  },

  tip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8EAF2",
    padding: 14,
    borderRadius: 16,
    marginTop: 22,
  },

  tipEmoji: {
    fontSize: 22,
    marginRight: 10,
  },

  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.dark,
  },

  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.pink,
    borderRadius: 18,
    paddingVertical: 18,
    marginTop: 24,
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },

  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  arrow: {
    color: COLORS.white,
    fontSize: 22,
    marginLeft: 10,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "700",
    color: COLORS.muted,
  },
});