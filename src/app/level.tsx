
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
      pathname: "/dashboard",
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
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.step}>STEP 3 OF 3</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.eyebrow}>YOUR LEARNING JOURNEY</Text>
        <Text style={styles.title}>
          What's your{"\n"}current level?
        </Text>
        <Text style={styles.subtitle}>
          No pressure! Choose the level that feels right for you.
        </Text>

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

        <View style={styles.tip}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            You can change your level anytime as you improve.
          </Text>
        </View>

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
    backgroundColor: "#FFF7FA",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1E4EA",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 32,
    color: "#29212A",
    lineHeight: 35,
  },
  step: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#B66A8A",
  },
  placeholder: {
    width: 43,
  },
  progressTrack: {
    height: 6,
    borderRadius: 10,
    backgroundColor: "#F0DFE7",
    marginTop: 20,
    marginBottom: 35,
    overflow: "hidden",
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EA79A7",
    borderRadius: 10,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#D36B96",
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    color: "#28202A",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#8B818A",
    marginTop: 12,
    marginBottom: 27,
  },
  levelList: {
    gap: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: "#F0E6EB",
    padding: 15,
    minHeight: 104,
  },
  activeCard: {
    borderColor: "#E96F9F",
    backgroundColor: "#FFF9FC",
    shadowColor: "#D96D99",
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
    color: "#302632",
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8B818A",
    marginTop: 5,
  },
  radio: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.8,
    borderColor: "#D9CFD5",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  activeRadio: {
    borderColor: "#E96F9F",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E96F9F",
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0D9",
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
    color: "#795B36",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E96F9F",
    borderRadius: 18,
    paddingVertical: 18,
    marginTop: 24,
    shadowColor: "#D96D99",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  arrow: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: 10,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "700",
    color: "#B6A2AE",
  },
});
