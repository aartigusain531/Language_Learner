
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
};

const goals = [
  { label: "💼 Grow your career", value: "career" },
  { label: "🎓 Thrive at university", value: "university" },
  { label: "✏️ Prepare for a test", value: "test" },
  { label: "🌍 Travel abroad", value: "travel" },
  { label: "🎉 Just for fun", value: "fun" },
  { label: "Something else...", value: "other" },
];

export default function LearningGoalsScreen() {
  const { language } = useLocalSearchParams<{
    language?: string;
  }>();

  const [selected, setSelected] = useState<string[]>([
    "career",
    "travel",
  ]);

  const toggleGoal = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) return;

    router.push({
      pathname: "/level",
      params: {
        language: language || "English",
        goals: JSON.stringify(selected),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={COLORS.dark}
            />
          </TouchableOpacity>

          {/* Page Title */}
          <Text style={styles.title}>
            What are your{"\n"}learning goals?
          </Text>

          {/* Learning Goals */}
          <View style={styles.options}>
            {goals.map((goal) => {
              const active = selected.includes(goal.value);

              return (
                <TouchableOpacity
                  key={goal.value}
                  style={[
                    styles.option,
                    active && styles.selected,
                  ]}
                  onPress={() => toggleGoal(goal.value)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text style={styles.optionText}>
                    {goal.label}
                  </Text>

                  {active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={21}
                      color={COLORS.pink}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              selected.length === 0 && styles.disabled,
            ]}
            disabled={selected.length === 0}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>
              Continue →
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    borderRadius: 42,
    overflow: "hidden",
  },

  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30,
  },

  backButton: {
    position: "absolute",
    top: 18,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.softPink,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 3,
  },

  title: {
    fontSize: 34,
    lineHeight: 43,
    fontWeight: "800",
    fontFamily: "Georgia",
    color: COLORS.dark,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 48,
  },

  options: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },

  option: {
    width: "100%",
    minHeight: 64,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#F5F0FA",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#E8DDF3",
  },

  selected: {
    backgroundColor: COLORS.softPink,
    borderColor: COLORS.pink,
    borderWidth: 2,
  },

  optionText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    flexShrink: 1,
  },

  checkIcon: {
    position: "absolute",
    right: 12,
  },

  continueButton: {
    width: "100%",
    backgroundColor: COLORS.pink,
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
    elevation: 3,
    shadowColor: COLORS.pink,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  continueText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  disabled: {
    opacity: 0.45,
  },
});
