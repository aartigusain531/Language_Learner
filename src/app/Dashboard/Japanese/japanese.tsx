
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const categories = [
  "All",
  "Hiragana",
  "Katakana",
  "Kanji",
  "Vocabulary",
  "Grammar",
  "Conversation",
];

const lessons = [
  {
    id: "1",
    category: "Hiragana",
    title: "Japanese Vowels",
    japanese: "あ い う え お",
    pronunciation: "a, i, u, e, o",
    meaning: "The five Japanese vowel sounds",
    description: "Start learning your first five characters.",
    duration: "8 min",
    color: "#FCE4EC",
    icon: "text",
  },
  {
    id: "2",
    category: "Hiragana",
    title: "Hiragana K Row",
    japanese: "か き く け こ",
    pronunciation: "ka, ki, ku, ke, ko",
    meaning: "The K-row characters",
    description: "Learn five more Hiragana characters.",
    duration: "10 min",
    color: "#FCE4EC",
    icon: "text",
  },
  {
    id: "3",
    category: "Katakana",
    title: "Katakana Vowels",
    japanese: "ア イ ウ エ オ",
    pronunciation: "a, i, u, e, o",
    meaning: "The five Katakana vowel characters",
    description: "Explore the second Japanese writing system.",
    duration: "8 min",
    color: "#E8E5FF",
    icon: "book-outline",
  },
  {
    id: "4",
    category: "Kanji",
    title: "Your First Kanji",
    japanese: "日 月 山",
    pronunciation: "hi / tsuki / yama",
    meaning: "Sun/day, moon and mountain",
    description: "Discover three basic Kanji characters.",
    duration: "12 min",
    color: "#E0F2F1",
    icon: "school-outline",
  },
  {
    id: "5",
    category: "Vocabulary",
    title: "Everyday Greetings",
    japanese: "こんにちは",
    pronunciation: "Konnichiwa",
    meaning: "Hello / Good afternoon",
    description: "Learn useful everyday Japanese words.",
    duration: "7 min",
    color: "#FFF0D9",
    icon: "chatbubble-outline",
  },
  {
    id: "6",
    category: "Grammar",
    title: "Your First Sentence",
    japanese: "わたしは学生です。",
    pronunciation: "Watashi wa gakusei desu.",
    meaning: "I am a student.",
    description: "Understand a simple Japanese sentence.",
    duration: "12 min",
    color: "#E5F0FF",
    icon: "create-outline",
  },
  {
    id: "7",
    category: "Conversation",
    title: "Introduce Yourself",
    japanese: "はじめまして",
    pronunciation: "Hajimemashite",
    meaning: "Nice to meet you.",
    description: "Practise introducing yourself in Japanese.",
    duration: "10 min",
    color: "#FCE4EC",
    icon: "people-outline",
  },
  {
    id: "8",
    category: "Vocabulary",
    title: "Say Thank You",
    japanese: "ありがとう",
    pronunciation: "Arigatou",
    meaning: "Thank you",
    description: "Learn an important Japanese expression.",
    duration: "5 min",
    color: "#FFF0D9",
    icon: "heart-outline",
  },
];

export default function JapaneseDashboard() {
  const router = useRouter();

  const { language, level, goals } = useLocalSearchParams<{
    language?: string;
    level?: string;
    goals?: string;
  }>();

  const [activeCategory, setActiveCategory] = useState("All");
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const levelName = level
    ? level.charAt(0).toUpperCase() + level.slice(1)
    : "Beginner";

  const filteredLessons =
    activeCategory === "All"
      ? lessons
      : lessons.filter(
          (lesson) => lesson.category === activeCategory
        );

  const nextLesson = lessons.find(
    (lesson) => !completed.includes(lesson.id)
  );

  const progress = Math.round(
    (completed.length / lessons.length) * 100
  );

  const markCompleted = () => {
    if (!selectedLesson) return;

    setCompleted((previous) =>
      previous.includes(selectedLesson.id)
        ? previous
        : [...previous, selectedLesson.id]
    );

    setSelectedLesson(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF7FA"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>ト</Text>
          </View>

          <View style={{ flex: 1, marginLeft: 11 }}>
            <Text style={styles.brand}>TRAGO</Text>
            <Text style={styles.brandSub}>
              Your Japanese learning space
            </Text>
          </View>

          <TouchableOpacity
            style={styles.settings}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color="#B84D78"
            />
          </TouchableOpacity>
        </View>

        {/* LANGUAGE AND LEVEL */}
        <View style={styles.selectionRow}>
          <View style={styles.selectionCard}>
            <Text style={styles.flag}>🇯🇵</Text>
            <View>
              <Text style={styles.smallLabel}>LEARNING</Text>
              <Text style={styles.selectionTitle}>
                {language || "Japanese"}
              </Text>
            </View>
          </View>

          <View style={styles.selectionCard}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>A1</Text>
            </View>
            <View>
              <Text style={styles.smallLabel}>YOUR LEVEL</Text>
              <Text style={styles.selectionTitle}>
                {levelName}
              </Text>
            </View>
          </View>
        </View>

        {/* HERO BANNER */}
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroEyebrow}>
              あなたの日本語の旅
            </Text>

            <Text style={styles.heroTitle}>
              こんにちは!
            </Text>

            <Text style={styles.heroSubtitle}>
              Your Japanese journey starts here.
              {"\n"}Learn something new every day!
            </Text>

            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>
                日本語を学ぼう ✨
              </Text>
            </View>
          </View>

          <View style={styles.heroDecoration}>
            <Text style={{ fontSize: 35 }}>🌸</Text>
            <Text style={styles.heroSymbol}>あ</Text>
          </View>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressCard}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionTitle}>
                Your learning journey
              </Text>
              <Text style={styles.muted}>
                Every lesson brings you closer!
              </Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>
                {progress}%
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <Text style={styles.progressCaption}>
            {completed.length} of {lessons.length} lessons completed
          </Text>
        </View>

        {/* NEXT LESSON */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Continue learning
            </Text>
            <Text style={styles.muted}>
              Your recommended next lesson
            </Text>
          </View>

          <View style={styles.guidedBadge}>
            <Ionicons
              name="compass-outline"
              size={13}
              color="#B84D78"
            />
            <Text style={styles.guidedText}>GUIDED</Text>
          </View>
        </View>

        {nextLesson ? (
          <TouchableOpacity
            style={styles.nextCard}
            activeOpacity={0.85}
            onPress={() => setSelectedLesson(nextLesson)}
          >
            <View
              style={[
                styles.lessonIcon,
                { backgroundColor: nextLesson.color },
              ]}
            >
              <Text style={styles.lessonJapanese}>
                あ
              </Text>
            </View>

            <View style={{ flex: 1, marginLeft: 13 }}>
              <Text style={styles.nextEyebrow}>
                NEXT UP
              </Text>

              <Text style={styles.lessonTitle}>
                {nextLesson.title}
              </Text>

              <Text style={styles.muted}>
                {nextLesson.description}
              </Text>

              <Text style={styles.duration}>
                ◷ {nextLesson.duration}
              </Text>
            </View>

            <View style={styles.playButton}>
              <Ionicons
                name="play"
                size={19}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBanner}>
            <Text style={{ fontSize: 30 }}>🎉</Text>
            <Text style={styles.sectionTitle}>
              All lessons completed!
            </Text>
          </View>
        )}

        {/* EXPLORE */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Explore Japanese
            </Text>
            <Text style={styles.muted}>
              Pick a topic and learn at your pace
            </Text>
          </View>
        </View>

        {/* CATEGORY FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryChip,
                  active && styles.activeCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* LESSON CARDS */}
        <View style={styles.lessonGrid}>
          {filteredLessons.map((lesson) => {
            const isCompleted = completed.includes(lesson.id);

            return (
              <TouchableOpacity
                key={lesson.id}
                style={styles.exploreCard}
                activeOpacity={0.85}
                onPress={() => setSelectedLesson(lesson)}
              >
                <View style={styles.rowBetween}>
                  <View
                    style={[
                      styles.exploreIcon,
                      { backgroundColor: lesson.color },
                    ]}
                  >
                    <Ionicons
                      name={lesson.icon as any}
                      size={23}
                      color="#B84D78"
                    />
                  </View>

                  <Ionicons
                    name={
                      isCompleted
                        ? "checkmark-circle"
                        : "arrow-forward-circle-outline"
                    }
                    size={23}
                    color={isCompleted ? "#0E9D91" : "#B84D78"}
                  />
                </View>

                <Text style={styles.categoryLabel}>
                  {lesson.category.toUpperCase()}
                </Text>

                <Text style={styles.exploreTitle}>
                  {lesson.title}
                </Text>

                <Text style={styles.muted}>
                  {lesson.description}
                </Text>

                <Text style={styles.exploreDuration}>
                  ◷ {lesson.duration}
                </Text>

                {isCompleted && (
                  <Text style={styles.doneText}>
                    COMPLETED
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* WORD OF THE DAY */}
        <View style={styles.wordCard}>
          <Text style={styles.wordEyebrow}>
            WORD OF THE DAY
          </Text>

          <Text style={styles.wordJapanese}>桜</Text>

          <Text style={styles.wordPronunciation}>
            Sakura
          </Text>

          <Text style={styles.wordMeaning}>
            Cherry blossom 🌸
          </Text>

          <Text style={styles.wordNote}>
            A beautiful symbol of spring in Japan.
          </Text>
        </View>

        <Text style={styles.footer}>
          YOUR JOURNEY, YOUR PACE ✨
        </Text>
      </ScrollView>

      {/* LESSON POPUP */}
      <Modal
        visible={selectedLesson !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedLesson(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalCategory}>
                {selectedLesson?.category.toUpperCase()}
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedLesson(null)}
                style={styles.closeButton}
              >
                <Ionicons
                  name="close"
                  size={23}
                  color="#302632"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>
              {selectedLesson?.title}
            </Text>

            <View style={styles.japaneseBox}>
              <Text style={styles.modalJapanese}>
                {selectedLesson?.japanese}
              </Text>

              <Text style={styles.modalPronunciation}>
                {selectedLesson?.pronunciation}
              </Text>
            </View>

            <Text style={styles.modalSectionTitle}>
              Meaning
            </Text>

            <Text style={styles.modalMeaning}>
              {selectedLesson?.meaning}
            </Text>

            <Text style={styles.modalSectionTitle}>
              About this lesson
            </Text>

            <Text style={styles.modalExplanation}>
              {selectedLesson?.description}
            </Text>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={markCompleted}
              activeOpacity={0.85}
            >
              <Text style={styles.completeButtonText}>
                Mark as completed
              </Text>

              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <Text style={styles.modalNote}>
              Practise saying the Japanese characters aloud!
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF7FA",
  },

  container: {
    padding: 18,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#B84D78",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  brand: {
    color: "#302632",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 3,
  },

  brandSub: {
    color: "#95858E",
    fontSize: 11,
  },

  settings: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E6EB",
    alignItems: "center",
    justifyContent: "center",
  },

  selectionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 17,
  },

  selectionCard: {
    flex: 1,
    minHeight: 65,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E6EB",
    borderRadius: 17,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  flag: {
    fontSize: 23,
  },

  smallLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#A18D97",
    letterSpacing: 1,
  },

  selectionTitle: {
    color: "#302632",
    fontWeight: "800",
    fontSize: 13,
    marginTop: 3,
  },

  levelBadge: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
  },

  levelBadgeText: {
    color: "#B84D78",
    fontWeight: "900",
  },

  hero: {
    backgroundColor: "#B84D78",
    borderRadius: 25,
    minHeight: 180,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom: 17,
  },

  heroEyebrow: {
    color: "#FFE4EF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "900",
    marginTop: 10,
  },

  heroSubtitle: {
    color: "#FFF0F5",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },

  heroTag: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF30",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 13,
  },

  heroTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  heroDecoration: {
    width: 95,
    height: 105,
    backgroundColor: "#FFFFFF25",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  heroSymbol: {
    fontSize: 39,
    color: "#FFFFFF",
    fontWeight: "900",
  },

  progressCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E6EB",
    borderRadius: 21,
    padding: 17,
    marginBottom: 25,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#302632",
  },

  muted: {
    color: "#968991",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  progressCircle: {
    width: 47,
    height: 47,
    borderRadius: 24,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
  },

  progressPercent: {
    color: "#B84D78",
    fontWeight: "900",
    fontSize: 12,
  },

  progressTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#F0E6EB",
    overflow: "hidden",
    marginTop: 17,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#B84D78",
    borderRadius: 10,
  },

  progressCaption: {
    color: "#968991",
    fontSize: 10,
    marginTop: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
    marginTop: 4,
  },

  guidedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FCE4EC",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
  },

  guidedText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#B84D78",
  },

  nextCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E6EB",
    borderRadius: 21,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  lessonIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  lessonJapanese: {
    color: "#B84D78",
    fontSize: 25,
    fontWeight: "800",
  },

  nextEyebrow: {
    color: "#B84D78",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  lessonTitle: {
    color: "#302632",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 3,
  },

  duration: {
    color: "#968991",
    fontSize: 11,
    marginTop: 5,
  },

  playButton: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: "#B84D78",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  completedBanner: {
    backgroundColor: "#FCE4EC",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    marginBottom: 25,
    gap: 8,
  },

  categoryRow: {
    gap: 9,
    paddingBottom: 15,
  },

  categoryChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0E6EB",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },

  activeCategory: {
    backgroundColor: "#B84D78",
    borderColor: "#B84D78",
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#776771",
  },

  activeCategoryText: {
    color: "#FFFFFF",
  },

  lessonGrid: {
    gap: 13,
  },

  exploreCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0E6EB",
    padding: 16,
  },

  exploreIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#B84D78",
    marginTop: 12,
  },

  exploreTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#302632",
    marginTop: 5,
  },

  exploreDuration: {
    fontSize: 11,
    color: "#968991",
    marginTop: 12,
  },

  doneText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#0E9D91",
    marginTop: 8,
  },

  wordCard: {
    backgroundColor: "#FCE4EC",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    marginTop: 25,
  },

  wordEyebrow: {
    color: "#B84D78",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  wordJapanese: {
    fontSize: 43,
    fontWeight: "900",
    color: "#302632",
    marginTop: 12,
  },

  wordPronunciation: {
    fontSize: 17,
    fontWeight: "800",
    color: "#B84D78",
    marginTop: 5,
  },

  wordMeaning: {
    fontSize: 14,
    fontWeight: "700",
    color: "#57434D",
    marginTop: 5,
  },

  wordNote: {
    color: "#806C76",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 9,
  },

  footer: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#A18D97",
    marginTop: 25,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#24192399",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#FFF7FA",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 35,
  },

  modalCategory: {
    color: "#B84D78",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  closeButton: {
    width: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
  },

  modalTitle: {
    color: "#302632",
    fontSize: 23,
    fontWeight: "900",
    marginTop: 15,
  },

  japaneseBox: {
    backgroundColor: "#FCE4EC",
    borderRadius: 20,
    padding: 23,
    alignItems: "center",
    marginTop: 20,
  },

  modalJapanese: {
    color: "#302632",
    fontSize: 31,
    fontWeight: "900",
    textAlign: "center",
  },

  modalPronunciation: {
    color: "#B84D78",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
    textAlign: "center",
  },

  modalSectionTitle: {
    color: "#302632",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 20,
  },

  modalMeaning: {
    color: "#B84D78",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },

  modalExplanation: {
    color: "#776771",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 7,
  },

  completeButton: {
    backgroundColor: "#B84D78",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 25,
  },

  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  modalNote: {
    color: "#968991",
    fontSize: 10,
    textAlign: "center",
    marginTop: 13,
  },
});
