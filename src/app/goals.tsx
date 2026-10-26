
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
      pathname: "/level" as any,
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
              color="#080808"
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
                      color="#080808"
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
    backgroundColor: "#F66B55",
  },

  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 42,
    overflow: "hidden",
  },

  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 76,
    paddingBottom: 30,
  },

  backButton: {
    position: "absolute",
    top: 18,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#F5F0EB",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 3,
  },

  title: {
    fontSize: 38,
    lineHeight: 45,
    fontWeight: "800",
    fontFamily: "Georgia",
    color: "#080808",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 58,
  },

  options: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  option: {
    width: "40%",
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#E8DED5",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  selected: {
    backgroundColor: "#d3c7fb",
    borderColor: "#ac8ef3",
  },

  optionText: {
    color: "#080808",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },

  checkIcon: {
    position: "absolute",
    right: 12,
  },

  continueButton: {
    width: "30%",
    backgroundColor: "#F66B55",
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  disabled: {
    opacity: 0.45,
  },
});
