
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PINK = "#E8569A";
const PINK_DARK = "#D94387";
const PINK_LIGHT = "#FDE4F0";
const PINK_BG = "#FFF8FB";
const PINK_SOFT = "#FFF0F6";
const TEXT = "#211A21";
const MUTED = "#8B7F88";
const BORDER = "#F1DCE7";
const WHITE = "#FFFFFF";
const GREEN = "#39A86B";

type Language = {
  name: string;
  flag: string;
  native: string;
};

type Page =
  | "home"
  | "languages"
  | "chooseLanguage"
  | "level"
  | "about"
  | "vowels"
  | "consonants"
  | "pronunciation"
  | "syllables"
  | "reading"
  | "writing"
  | "vocabulary"
  | "grammar"
  | "listening"
  | "speaking"
  | "conversation"
  | "progress"
  | "achievements"
  | "settings"
  | "profile";

const LANGUAGES: Language[] = [
  { name: "Korean", flag: "🇰🇷", native: "한국어" },
  { name: "Japanese", flag: "🇯🇵", native: "日本語" },
  { name: "Spanish", flag: "🇪🇸", native: "Español" },
  { name: "French", flag: "🇫🇷", native: "Français" },
  { name: "German", flag: "🇩🇪", native: "Deutsch" },
  { name: "Chinese", flag: "🇨🇳", native: "中文" },
];

const LEVELS = [
  { code: "A1", title: "Beginner", detail: "I am just starting." },
  { code: "A2", title: "Elementary", detail: "I know some basics." },
  { code: "B1", title: "Intermediate", detail: "I can manage everyday situations." },
  { code: "B2", title: "Upper Intermediate", detail: "I can communicate confidently." },
  { code: "C1", title: "Advanced", detail: "I can discuss complex topics." },
  { code: "C2", title: "Proficient", detail: "I understand almost everything." },
];

const MENU_GROUPS: {
  title: string;
  items: { id: Page; label: string; icon: string }[];
}[] = [
  {
    title: "LEARN",
    items: [
      { id: "about", label: "About", icon: "ⓘ" },
      { id: "vowels", label: "Vowels", icon: "◉" },
      { id: "consonants", label: "Consonants", icon: "◇" },
      { id: "pronunciation", label: "Pronunciation", icon: "🔊" },
      { id: "syllables", label: "Syllables", icon: "▦" },
      { id: "reading", label: "Reading", icon: "📖" },
      { id: "writing", label: "Writing", icon: "✍️" },
    ],
  },
  {
    title: "PRACTICE",
    items: [
      { id: "vocabulary", label: "Vocabulary", icon: "🧠" },
      { id: "grammar", label: "Grammar", icon: "📝" },
      { id: "listening", label: "Listening", icon: "🎧" },
      { id: "speaking", label: "Speaking", icon: "🎤" },
      { id: "conversation", label: "Conversation", icon: "💬" },
    ],
  },
  {
    title: "YOUR JOURNEY",
    items: [
      { id: "progress", label: "Progress", icon: "↗" },
      { id: "achievements", label: "Achievements", icon: "🏆" },
    ],
  },
];

const PAGE_DETAILS: Record<
  string,
  { icon: string; title: string; description: string }
> = {
  vowels: { icon: "◉", title: "Vowels", description: "Learn the vowel sounds of your language." },
  consonants: { icon: "◇", title: "Consonants", description: "Learn consonants and their sounds." },
  pronunciation: { icon: "🔊", title: "Pronunciation", description: "Practice pronunciation and sounds." },
  syllables: { icon: "▦", title: "Syllables", description: "Build syllables and understand how words are formed." },
  reading: { icon: "📖", title: "Reading", description: "Build your reading skills step by step." },
  writing: { icon: "✍️", title: "Writing", description: "Practice writing characters and sentences." },
  vocabulary: { icon: "🧠", title: "Vocabulary", description: "Learn useful words and expressions." },
  grammar: { icon: "📝", title: "Grammar", description: "Learn grammar from basic to advanced." },
  listening: { icon: "🎧", title: "Listening", description: "Train your listening skills." },
  speaking: { icon: "🎤", title: "Speaking", description: "Practice speaking naturally." },
  conversation: { icon: "💬", title: "Conversation", description: "Practice real conversations." },
  progress: { icon: "📊", title: "Your Progress", description: "Track your complete learning journey." },
  achievements: { icon: "🏆", title: "Achievements", description: "Celebrate your learning milestones." },
  settings: { icon: "⚙️", title: "Settings", description: "Manage your Trago preferences." },
};

function AppButton({
  title,
  onPress,
  secondary = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.appButton,
        secondary && styles.secondaryButton,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.appButtonText, secondary && styles.secondaryButtonText]}>
        {title}
      </Text>
    </Pressable>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <View style={styles.sectionTitle}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.sectionHeading}>{title}</Text>
      {description ? <Text style={styles.muted}>{description}</Text> : null}
    </View>
  );
}

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const [page, setPage] = useState<Page>("home");
  const [userName, setUserName] = useState("Alex");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("A");
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [level, setLevel] = useState("A1");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [myLanguages, setMyLanguages] = useState<Language[]>([LANGUAGES[0]]);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const [savedName, savedEmail, savedAvatar, savedLanguage, savedLevel, savedLanguages] =
          await Promise.all([
            AsyncStorage.getItem("userName"),
            AsyncStorage.getItem("userEmail"),
            AsyncStorage.getItem("userAvatar"),
            AsyncStorage.getItem("tragoLanguage"),
            AsyncStorage.getItem("tragoLevel"),
            AsyncStorage.getItem("tragoLanguages"),
          ]);

        if (!mounted) return;

        if (savedName) setUserName(savedName);
        if (savedEmail) setEmail(savedEmail);
        if (savedAvatar) setAvatar(savedAvatar);

        if (savedLanguage) {
          const found = LANGUAGES.find((item) => item.name === savedLanguage);
          if (found) setLanguage(found);
        }

        if (savedLevel) setLevel(savedLevel);

        if (savedLanguages) {
          const parsed = JSON.parse(savedLanguages) as Language[];
          if (Array.isArray(parsed) && parsed.length) setMyLanguages(parsed);
        }
      } catch (error) {
        console.warn("Could not load Trago profile.", error);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  async function saveLanguage(nextLanguage: Language, nextLevel: string) {
    try {
      const updated = myLanguages.some((item) => item.name === nextLanguage.name)
        ? myLanguages
        : [...myLanguages, nextLanguage];

      setLanguage(nextLanguage);
      setLevel(nextLevel);
      setMyLanguages(updated);

      await Promise.all([
        AsyncStorage.setItem("tragoLanguage", nextLanguage.name),
        AsyncStorage.setItem("tragoLevel", nextLevel),
        AsyncStorage.setItem("tragoLanguages", JSON.stringify(updated)),
      ]);

      setPage("home");
      setSelectedLanguage(null);
    } catch {
      Alert.alert("Unable to save", "Please try selecting your language again.");
    }
  }

  function goTo(nextPage: Page) {
    setPage(nextPage);
    setShowSidebar(false);
  }

  function beginLanguageChoice() {
    setSelectedLanguage(null);
    setPage("chooseLanguage");
  }

  function chooseLanguage(item: Language) {
    setSelectedLanguage(item);
  }

  function selectCurrentLanguage(item: Language) {
    setLanguage(item);
    setLevel("A1");
    setSelectedLanguage(item);
    setSelectedLevel("A1");
    setPage("level");
  }

  const currentLevel = LEVELS.find((item) => item.code === level) ?? LEVELS[0];

  function renderSidebar() {
    return (
      <View style={styles.sidebar}>
        <Pressable style={styles.brand} onPress={() => goTo("home")}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={styles.brandName}>Trago</Text>
        </Pressable>

        <ScrollView
          style={styles.sidebarScroll}
          showsVerticalScrollIndicator={false}
        >
          <SidebarItem icon="⌂" label="Home" active={page === "home"} onPress={() => goTo("home")} />
          <SidebarItem icon="◎" label="Languages" active={page === "languages"} onPress={() => goTo("languages")} />

          <Pressable style={styles.currentLanguage} onPress={beginLanguageChoice}>
            <Text style={styles.flag}>{language.flag}</Text>
            <View style={styles.flex}>
              <Text style={styles.currentLanguageName}>{language.name}</Text>
              <Text style={styles.smallMuted}>{level} {currentLevel.title}</Text>
            </View>
          </Pressable>

          {MENU_GROUPS.map((group) => (
            <View key={group.title}>
              <Text style={styles.menuTitle}>{group.title}</Text>
              {group.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={page === item.id}
                  onPress={() => goTo(item.id)}
                />
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.sidebarBottom}>
          <SidebarItem
            icon="⚙"
            label="Settings"
            active={page === "settings"}
            onPress={() => goTo("settings")}
          />
          <Pressable style={styles.profileRow} onPress={() => goTo("profile")}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatar}</Text>
            </View>
            <View style={styles.flex}>
              <Text numberOfLines={1} style={styles.profileName}>{userName}</Text>
              <Text style={styles.smallMuted}>Language learner</Text>
            </View>
            <Text style={styles.muted}>•••</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function renderHome() {
    return (
      <>
        <View style={styles.welcome}>
          <View style={styles.flex}>
            <Text style={styles.eyebrow}>{language.flag} {language.name.toUpperCase()} LEARNING</Text>
            <Text style={styles.welcomeTitle}>
              Hello, <Text style={styles.pinkText}>{userName}</Text>! 👋
            </Text>
            <Text style={styles.muted}>
              Continue your journey and learn something new today.
            </Text>
          </View>

          <View style={styles.languageSelector}>
            <Text style={styles.flag}>{language.flag}</Text>
            <View style={styles.flex}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.smallMuted}>{level} {currentLevel.title}</Text>
            </View>
            <Pressable onPress={beginLanguageChoice} style={styles.changeButton}>
              <Text style={styles.pinkText}>Change</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.flex}>
              <Text style={styles.eyebrow}>YOUR LEARNING PATH</Text>
              <Text style={styles.cardTitle}>{language.name} Foundations</Text>
              <Text style={styles.muted}>Build your language skills step by step.</Text>
            </View>
            <Text style={styles.progressPill}>2 / 7</Text>
          </View>

          {[
            { title: `${language.name} Alphabet`, description: "Learn the basic building blocks", completed: true },
            { title: `${language.name} Vowels`, description: "Learn basic and compound vowels", completed: true },
            { title: `${language.name} Consonants`, description: "Learn basic consonants", current: true },
            { title: `${language.name} Syllables`, description: "Build syllables step by step" },
            { title: `${language.name} Reading`, description: "Start reading words" },
            { title: `${language.name} Writing`, description: "Learn to write" },
            { title: `Basic ${language.name} Conversation`, description: "Use what you've learned" },
          ].map((item, index) => (
            <View key={item.title} style={styles.pathItem}>
              <View
                style={[
                  styles.pathNumber,
                  item.completed && styles.completedNumber,
                  item.current && styles.currentNumber,
                ]}
              >
                <Text style={[
                  styles.pathNumberText,
                  item.completed && styles.completedNumberText,
                  item.current && styles.currentNumberText,
                ]}>
                  {item.completed ? "✓" : String(index + 1).padStart(2, "0")}
                </Text>
              </View>

              <View style={styles.flex}>
                <Text style={styles.pathTitle}>{item.title}</Text>
                <Text style={styles.smallMuted}>{item.description}</Text>
                {item.current ? (
                  <View style={styles.progressTrack}>
                    <View style={styles.progressFill} />
                  </View>
                ) : null}
              </View>

              {item.completed ? (
                <Text style={styles.completedText}>Completed</Text>
              ) : item.current ? (
                <Pressable
                  style={styles.continueButton}
                  onPress={() => goTo("consonants")}
                >
                  <Text style={styles.continueText}>Continue</Text>
                </Pressable>
              ) : (
                <Text style={styles.lock}>🔒</Text>
              )}
            </View>
          ))}
        </View>

        <SectionTitle
          title="Today's practice"
          description="Practice different parts of your language skills."
        />

        <View style={styles.practiceGrid}>
          {[
            { icon: "🔊", title: "Hear it", detail: "Practice sounds", time: "5 min →", page: "pronunciation" as Page, color: "#FDE8F2" },
            { icon: "✍️", title: "Write it", detail: "Practice writing", time: "10 min →", page: "writing" as Page, color: "#EEE9FF" },
            { icon: "🎤", title: "Say it", detail: "Practice speaking", time: "8 min →", page: "speaking" as Page, color: "#E9F2FF" },
            { icon: "📖", title: "Read it", detail: "Practice reading", time: "10 min →", page: "reading" as Page, color: "#E8F8EF" },
          ].map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [styles.practiceCard, pressed && styles.pressed]}
              onPress={() => goTo(item.page)}
            >
              <View style={[styles.practiceIcon, { backgroundColor: item.color }]}>
                <Text style={styles.practiceEmoji}>{item.icon}</Text>
              </View>
              <Text style={styles.practiceTitle}>{item.title}</Text>
              <Text style={styles.smallMuted}>{item.detail}</Text>
              <Text style={styles.practiceTime}>{item.time}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.card, styles.activityCard]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Your activity</Text>
                <Text style={styles.muted}>Learning time this week</Text>
              </View>
              <Text style={styles.pinkNumber}>4h 25m</Text>
            </View>

            <View style={styles.chart}>
              {[45, 65, 35, 82, 58, 72, 42].map((height, index) => (
                <View key={index} style={styles.barColumn}>
                  <View
                    style={[
                      styles.bar,
                      { height: `${height}%` },
                      index === 6 && styles.todayBar,
                    ]}
                  />
                  <Text style={styles.chartLabel}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.card, styles.streakCard]}>
            <View style={styles.streakIcon}>
              <Text style={styles.streakEmoji}>🌸</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.eyebrow}>CURRENT STREAK</Text>
              <Text style={styles.streakNumber}>12 days</Text>
              <Text style={styles.muted}>Keep learning every day!</Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  function renderLanguages() {
    return (
      <>
        <SectionTitle
          eyebrow="YOUR LANGUAGES"
          title="Languages"
          description="Choose what language you want to learn."
        />

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>My languages</Text>
              <Text style={styles.muted}>Your current learning languages.</Text>
            </View>
            <AppButton title="+ Add language" onPress={beginLanguageChoice} />
          </View>

          {myLanguages.map((item) => (
            <Pressable
              key={item.name}
              style={[
                styles.myLanguageCard,
                item.name === language.name && styles.myLanguageActive,
              ]}
              onPress={() => selectCurrentLanguage(item)}
            >
              <Text style={styles.flagLarge}>{item.flag}</Text>
              <View style={styles.flex}>
                <Text style={styles.pathTitle}>{item.name}</Text>
                <Text style={styles.smallMuted}>{item.native}</Text>
                <Text style={styles.smallMuted}>
                  {item.name === language.name ? `${level} · ${currentLevel.title}` : "Tap to start learning"}
                </Text>
              </View>
              {item.name === language.name ? (
                <Text style={styles.currentLabel}>CURRENT</Text>
              ) : (
                <Text style={styles.pinkText}>Select →</Text>
              )}
            </Pressable>
          ))}
        </View>
      </>
    );
  }

  function renderLanguageChooser() {
    return (
      <View style={styles.chooser}>
        <AppButton title="← Back to languages" secondary onPress={() => goTo("languages")} />
        <View style={styles.centerTitle}>
          <Text style={styles.eyebrow}>CHOOSE LANGUAGE</Text>
          <Text style={styles.chooserTitle}>Choose a language</Text>
          <Text style={styles.muted}>What language would you like to learn?</Text>
        </View>

        <View style={styles.languageGrid}>
          {LANGUAGES.map((item) => (
            <Pressable
              key={item.name}
              onPress={() => chooseLanguage(item)}
              style={[
                styles.languageOption,
                selectedLanguage?.name === item.name && styles.selectedOption,
              ]}
            >
              <Text style={styles.flagHuge}>{item.flag}</Text>
              <Text style={styles.languageName}>{item.name}</Text>
              <Text style={styles.smallMuted}>{item.native}</Text>
            </Pressable>
          ))}
        </View>

        <AppButton
          title="Continue →"
          onPress={() => {
            if (!selectedLanguage) return;
            setSelectedLevel("A1");
            setPage("level");
          }}
        />
      </View>
    );
  }

  function renderLevelChooser() {
    const targetLanguage = selectedLanguage ?? language;

    return (
      <View style={styles.chooser}>
        <AppButton title="← Back" secondary onPress={beginLanguageChoice} />

        <View style={styles.selectedLanguage}>
          <Text style={styles.flag}>{targetLanguage.flag}</Text>
          <View>
            <Text style={styles.languageName}>{targetLanguage.name}</Text>
            <Text style={styles.smallMuted}>Selected language</Text>
          </View>
        </View>

        <View style={styles.centerTitle}>
          <Text style={styles.eyebrow}>YOUR LEVEL</Text>
          <Text style={styles.chooserTitle}>What's your level?</Text>
          <Text style={styles.muted}>Choose the level that feels right for you.</Text>
        </View>

        <View style={styles.levelGrid}>
          {LEVELS.map((item) => (
            <Pressable
              key={item.code}
              onPress={() => setSelectedLevel(item.code)}
              style={[
                styles.levelOption,
                selectedLevel === item.code && styles.selectedOption,
              ]}
            >
              <Text style={styles.levelCode}>{item.code}</Text>
              <Text style={styles.pathTitle}>{item.title}</Text>
              <Text style={styles.smallMuted}>{item.detail}</Text>
            </Pressable>
          ))}
        </View>

        <AppButton
          title="Start learning →"
          onPress={() => saveLanguage(targetLanguage, selectedLevel)}
        />
      </View>
    );
  }

  function renderAbout() {
    return (
      <>
        <View style={styles.aboutHero}>
          <View style={styles.aboutHeroIcon}>
            <Text style={styles.practiceEmoji}>ⓘ</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.eyebrow}>ABOUT TRAGO</Text>
            <Text style={styles.aboutHeroTitle}>Learn languages, your way.</Text>
            <Text style={styles.muted}>
              Trago helps you build a language from the foundations to real conversation.
            </Text>
          </View>
        </View>

        <View style={styles.aboutGrid}>
          <AboutCard icon="🌸" title="What is Trago?">
            Trago is a language-learning app designed to help learners understand a language, not just memorize words.
            {"\n\n"}Learn sounds, characters, pronunciation, reading, writing, vocabulary, grammar, listening and conversation.
          </AboutCard>

          <AboutCard icon="🧩" title="Learn step by step">
            Every language is organized into clear learning stages.
            {"\n\n"}01 · Sounds{"\n"}02 · Characters{"\n"}03 · Pronunciation{"\n"}04 · Words
          </AboutCard>

          <View style={styles.card}>
            <Text style={styles.practiceEmoji}>🎯</Text>
            <Text style={styles.cardTitle}>Everything you need to learn</Text>
            <Text style={styles.muted}>
              Pronunciation · Vowels · Consonants · Syllables · Reading · Writing · Vocabulary · Grammar · Listening · Speaking · Conversation
            </Text>
          </View>

          <View style={[styles.card, styles.missionCard]}>
            <Text style={styles.eyebrow}>OUR APPROACH</Text>
            <Text style={styles.missionTitle}>
              Understand first. Practice next. Speak naturally.
            </Text>
            <Text style={styles.muted}>
              Trago is built around the idea that learning a language should feel like building a skill. 🌷
            </Text>
          </View>
        </View>
      </>
    );
  }

  function renderProfile() {
    return (
      <View style={styles.card}>
        <SectionTitle title="Your profile" description="Personalize your Trago experience." />
        <Text style={styles.inputLabel}>Your name</Text>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your name"
          placeholderTextColor={MUTED}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={MUTED}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <AppButton
          title="Save profile"
          onPress={async () => {
            try {
              await Promise.all([
                AsyncStorage.setItem("userName", userName.trim() || "Learner"),
                AsyncStorage.setItem("userEmail", email.trim()),
                AsyncStorage.setItem("userAvatar", (userName.trim()[0] || "A").toUpperCase()),
              ]);
              setUserName(userName.trim() || "Learner");
              setAvatar((userName.trim()[0] || "A").toUpperCase());
              Alert.alert("Saved", "Your profile has been updated.");
            } catch {
              Alert.alert("Unable to save", "Please try again.");
            }
          }}
        />
      </View>
    );
  }

  function renderGenericPage() {
    const details = PAGE_DETAILS[page];

    if (!details) return null;

    if (page === "settings") {
      return (
        <View style={styles.card}>
          <SectionTitle title="Settings" description="Manage your Trago preferences." />
          <Pressable style={styles.settingRow} onPress={() => goTo("profile")}>
            <Text style={styles.practiceEmoji}>👤</Text>
            <View style={styles.flex}>
              <Text style={styles.pathTitle}>Profile</Text>
              <Text style={styles.smallMuted}>Update your name and email</Text>
            </View>
            <Text style={styles.pinkText}>→</Text>
          </Pressable>
          <Pressable style={styles.settingRow} onPress={beginLanguageChoice}>
            <Text style={styles.practiceEmoji}>🌍</Text>
            <View style={styles.flex}>
              <Text style={styles.pathTitle}>Learning language</Text>
              <Text style={styles.smallMuted}>Change your language and level</Text>
            </View>
            <Text style={styles.pinkText}>→</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>{details.icon}</Text>
        <Text style={styles.placeholderTitle}>{details.title}</Text>
        <Text style={styles.muted}>{details.description}</Text>
        <Text style={styles.placeholderNote}>
          Your {language.name} {details.title.toLowerCase()} lessons can be added here.
        </Text>
        <AppButton title="Back to dashboard" onPress={() => goTo("home")} />
      </View>
    );
  }

  function renderContent() {
    switch (page) {
      case "home":
        return renderHome();
      case "languages":
        return renderLanguages();
      case "chooseLanguage":
        return renderLanguageChooser();
      case "level":
        return renderLevelChooser();
      case "about":
        return renderAbout();
      case "profile":
        return renderProfile();
      default:
        return renderGenericPage();
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <View style={styles.app}>
        {isWide ? renderSidebar() : null}

        <View style={styles.main}>
          <View style={styles.topbar}>
            {!isWide ? (
              <Pressable
                style={styles.mobileBrand}
                onPress={() => setShowSidebar(!showSidebar)}
              >
                <View style={styles.logo}>
                  <Text style={styles.logoText}>T</Text>
                </View>
                <Text style={styles.brandName}>Trago</Text>
              </Pressable>
            ) : (
              <Text style={styles.topbarLabel}>Your learning space</Text>
            )}

            <View style={styles.headerRight}>
              <Pressable
                style={styles.notification}
                onPress={() => Alert.alert("Notifications", "You're all caught up!")}
              >
                <Text style={styles.notificationIcon}>♢</Text>
                <View style={styles.notificationDot} />
              </Pressable>

              <Pressable style={styles.headerProfile} onPress={() => goTo("profile")}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{avatar}</Text>
                </View>
                {isWide ? (
                  <View style={styles.headerProfileText}>
                    <Text style={styles.profileName}>{userName}</Text>
                    <Text style={styles.smallMuted}>Learner</Text>
                  </View>
                ) : null}
              </Pressable>
            </View>
          </View>

          {showSidebar && !isWide ? (
            <View style={styles.mobileMenu}>
              <ScrollView style={styles.mobileMenuScroll}>
                <SidebarItem icon="⌂" label="Home" active={page === "home"} onPress={() => goTo("home")} />
                <SidebarItem icon="◎" label="Languages" active={page === "languages"} onPress={() => goTo("languages")} />
                {MENU_GROUPS.map((group) => (
                  <View key={group.title}>
                    <Text style={styles.menuTitle}>{group.title}</Text>
                    {group.items.map((item) => (
                      <SidebarItem key={item.id} icon={item.icon} label={item.label} active={page === item.id} onPress={() => goTo(item.id)} />
                    ))}
                  </View>
                ))}
                <SidebarItem icon="⚙" label="Settings" active={page === "settings"} onPress={() => goTo("settings")} />
                <SidebarItem icon="👤" label="Profile" active={page === "profile"} onPress={() => goTo("profile")} />
              </ScrollView>
            </View>
          ) : null}

          <ScrollView
            style={styles.contentScroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {page !== "home" &&
            page !== "languages" &&
            page !== "chooseLanguage" &&
            page !== "level" &&
            page !== "about" &&
            page !== "profile" ? (
              <View style={styles.searchBox}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search lessons..."
                  placeholderTextColor={MUTED}
                  style={styles.searchInput}
                />
              </View>
            ) : null}
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navItem,
        active && styles.navItemActive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.navIcon, active && styles.pinkText]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function AboutCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.aboutIcon}>
        <Text style={styles.practiceEmoji}>{icon}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.aboutText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PINK_BG,
  },
  app: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: PINK_BG,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  sidebar: {
    width: 225,
    backgroundColor: WHITE,
    borderRightWidth: 1,
    borderRightColor: BORDER,
    paddingHorizontal: 13,
    paddingTop: 18,
    paddingBottom: 10,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 9,
    paddingBottom: 23,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PINK,
  },
  logoText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "900",
  },
  brandName: {
    color: TEXT,
    fontSize: 19,
    fontWeight: "800",
  },
  sidebarScroll: {
    flex: 1,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 9,
    marginBottom: 3,
  },
  navItemActive: {
    backgroundColor: PINK_LIGHT,
  },
  navIcon: {
    width: 19,
    textAlign: "center",
    color: "#746B72",
    fontSize: 15,
  },
  navLabel: {
    flex: 1,
    color: "#746B72",
    fontSize: 12,
  },
  navLabelActive: {
    color: PINK,
    fontWeight: "700",
  },
  menuTitle: {
    color: "#B0A5AC",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
    paddingHorizontal: 11,
    paddingTop: 19,
    paddingBottom: 8,
  },
  currentLanguage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 11,
    marginTop: 6,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: "#FFFAFD",
  },
  flag: {
    fontSize: 23,
  },
  currentLanguageName: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "700",
  },
  smallMuted: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 15,
  },
  sidebarBottom: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 9,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 7,
    paddingVertical: 9,
  },
  avatar: {
    width: 33,
    height: 33,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PINK_LIGHT,
  },
  avatarText: {
    color: PINK,
    fontSize: 12,
    fontWeight: "800",
  },
  profileName: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "700",
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  topbar: {
    minHeight: 62,
    paddingHorizontal: 20,
    paddingVertical: 9,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 5,
  },
  topbarLabel: {
    color: MUTED,
    fontSize: 12,
  },
  mobileBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  notification: {
    position: "relative",
    padding: 5,
  },
  notificationIcon: {
    color: "#7D727A",
    fontSize: 23,
  },
  notificationDot: {
    position: "absolute",
    width: 7,
    height: 7,
    backgroundColor: PINK,
    borderRadius: 5,
    right: 3,
    top: 4,
  },
  headerProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerProfileText: {
    gap: 2,
  },
  mobileMenu: {
    position: "absolute",
    top: 62,
    left: 0,
    bottom: 0,
    width: 260,
    backgroundColor: WHITE,
    zIndex: 20,
    borderRightWidth: 1,
    borderRightColor: BORDER,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  mobileMenuScroll: {
    flex: 1,
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 27,
    paddingBottom: 45,
    gap: 20,
    maxWidth: 1250,
    width: "100%",
    alignSelf: "center",
  },
  welcome: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 2,
  },
  eyebrow: {
    color: PINK,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  welcomeTitle: {
    color: TEXT,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 7,
  },
  pinkText: {
    color: PINK,
  },
  muted: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 205,
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
  },
  languageName: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "700",
  },
  changeButton: {
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 7,
    backgroundColor: PINK_SOFT,
  },
  card: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    padding: 19,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },
  cardTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5,
  },
  progressPill: {
    color: PINK,
    backgroundColor: PINK_SOFT,
    overflow: "hidden",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
    fontSize: 11,
    fontWeight: "800",
  },
  pathItem: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#F5E8EE",
  },
  pathNumber: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F1F5",
  },
  pathNumberText: {
    color: "#A3949C",
    fontSize: 11,
    fontWeight: "800",
  },
  completedNumber: {
    backgroundColor: PINK,
  },
  completedNumberText: {
    color: WHITE,
  },
  currentNumber: {
    backgroundColor: PINK_SOFT,
  },
  currentNumberText: {
    color: PINK,
  },
  pathTitle: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 3,
  },
  completedText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: "700",
  },
  continueButton: {
    backgroundColor: PINK,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  continueText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: "800",
  },
  lock: {
    fontSize: 15,
  },
  progressTrack: {
    width: 130,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#F5E6ED",
    overflow: "hidden",
    marginTop: 7,
  },
  progressFill: {
    width: "62%",
    height: "100%",
    backgroundColor: PINK,
    borderRadius: 5,
  },
  sectionTitle: {
    gap: 4,
  },
  sectionHeading: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "800",
  },
  practiceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  practiceCard: {
    flexGrow: 1,
    flexBasis: 145,
    minWidth: 125,
    minHeight: 150,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 15,
    gap: 7,
  },
  pressed: {
    opacity: 0.75,
  },
  practiceIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  practiceEmoji: {
    fontSize: 22,
  },
  practiceTitle: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
  },
  practiceTime: {
    color: PINK,
    fontSize: 11,
    fontWeight: "800",
    marginTop: "auto",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  activityCard: {
    flex: 2,
    flexBasis: 280,
    minWidth: 250,
  },
  pinkNumber: {
    color: PINK,
    fontSize: 17,
    fontWeight: "800",
  },
  chart: {
    height: 150,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  barColumn: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 7,
  },
  bar: {
    width: "55%",
    maxWidth: 30,
    minHeight: 12,
    backgroundColor: PINK_LIGHT,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  todayBar: {
    backgroundColor: PINK,
  },
  chartLabel: {
    color: MUTED,
    fontSize: 9,
  },
  streakCard: {
    flex: 1,
    flexBasis: 210,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  streakIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: PINK_SOFT,
    alignItems: "center",
    justifyContent: "center",
  },
  streakEmoji: {
    fontSize: 28,
  },
  streakNumber: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 5,
  },
  appButton: {
    minHeight: 43,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: PINK,
  },
  appButtonText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  secondaryButtonText: {
    color: PINK,
  },
  myLanguageCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 13,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFAFD",
  },
  myLanguageActive: {
    borderColor: "#EF9BC0",
    backgroundColor: PINK_SOFT,
  },
  flagLarge: {
    fontSize: 30,
  },
  currentLabel: {
    color: PINK,
    fontSize: 9,
    fontWeight: "800",
  },
  chooser: {
    width: "100%",
    maxWidth: 850,
    alignSelf: "center",
    gap: 17,
  },
  centerTitle: {
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
  },
  chooserTitle: {
    color: TEXT,
    fontSize: 27,
    fontWeight: "800",
    textAlign: "center",
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  languageOption: {
    flexGrow: 1,
    flexBasis: 145,
    minWidth: 125,
    minHeight: 135,
    padding: 16,
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: PINK,
    backgroundColor: PINK_SOFT,
  },
  flagHuge: {
    fontSize: 34,
    marginBottom: 5,
  },
  selectedLanguage: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    backgroundColor: WHITE,
  },
  levelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
  },
  levelOption: {
    flexGrow: 1,
    flexBasis: 210,
    minWidth: 150,
    padding: 15,
    gap: 6,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    backgroundColor: WHITE,
  },
  levelCode: {
    color: PINK,
    fontSize: 12,
    fontWeight: "900",
  },
  aboutHero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    backgroundColor: PINK_SOFT,
  },
  aboutHeroIcon: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
    borderRadius: 15,
  },
  aboutHeroTitle: {
    color: TEXT,
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 6,
  },
  aboutGrid: {
    gap: 14,
  },
  aboutIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PINK_SOFT,
  },
  aboutText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 21,
  },
  missionCard: {
    backgroundColor: PINK_SOFT,
  },
  missionTitle: {
    color: TEXT,
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 32,
  },
  placeholder: {
    minHeight: 370,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    gap: 12,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 17,
  },
  placeholderIcon: {
    fontSize: 42,
  },
  placeholderTitle: {
    color: TEXT,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },
  placeholderNote: {
    color: PINK,
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
  },
  searchIcon: {
    color: MUTED,
    fontSize: 22,
  },
  searchInput: {
    flex: 1,
    minHeight: 42,
    color: TEXT,
    fontSize: 12,
  },
  inputLabel: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },
  input: {
    minHeight: 45,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 9,
    backgroundColor: PINK_BG,
    color: TEXT,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
});
