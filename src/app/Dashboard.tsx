// // app/dashboard.tsx
// // Trago — Adaptive Language Learning Dashboard
// // Requires: expo-router, @react-native-async-storage/async-storage,
// // expo-linear-gradient, @expo/vector-icons (Ionicons)

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// // ------------------------------------------------------
// // THEME
// // ------------------------------------------------------

// const TEAL = "#0F9D91";
// const TEAL_DARK = "#087F75";
// const TEAL_LIGHT = "#DDF7F3";
// const BACKGROUND = "#F5FAF9";
// const WHITE = "#FFFFFF";
// const TEXT = "#20312F";
// const MUTED = "#82918E";
// const BORDER = "#E4EEEB";

// type IconName = React.ComponentProps<typeof Ionicons>["name"];

// type Language = {
//   id: string;
//   name: string;
//   native: string;
//   flag: string;
//   script: string;
// };

// type Level = {
//   id: string;
//   title: string;
//   subtitle: string;
// };

// type Lesson = {
//   id: string;
//   title: string;
//   description: string;
//   icon: IconName;
//   color: string;
//   lightColor: string;
//   duration: string;
//   examples: string[];
//   tip: string;
// };

// // ------------------------------------------------------
// // LANGUAGES AND LEVELS
// // ------------------------------------------------------

// const LANGUAGES: Language[] = [
//   {
//     id: "english",
//     name: "English",
//     native: "English",
//     flag: "🇬🇧",
//     script: "Latin alphabet",
//   },
//   {
//     id: "korean",
//     name: "Korean",
//     native: "한국어",
//     flag: "🇰🇷",
//     script: "Hangul",
//   },
//   {
//     id: "japanese",
//     name: "Japanese",
//     native: "日本語",
//     flag: "🇯🇵",
//     script: "Hiragana, Katakana and Kanji",
//   },
//   {
//     id: "spanish",
//     name: "Spanish",
//     native: "Español",
//     flag: "🇪🇸",
//     script: "Latin alphabet",
//   },
//   {
//     id: "french",
//     name: "French",
//     native: "Français",
//     flag: "🇫🇷",
//     script: "Latin alphabet",
//   },
//   {
//     id: "german",
//     name: "German",
//     native: "Deutsch",
//     flag: "🇩🇪",
//     script: "Latin alphabet",
//   },
//   {
//     id: "chinese",
//     name: "Chinese",
//     native: "中文",
//     flag: "🇨🇳",
//     script: "Chinese characters",
//   },
// ];

// const LEVELS: Level[] = [
//   { id: "A1", title: "Absolute beginner", subtitle: "Start with the basics" },
//   { id: "A2", title: "Elementary", subtitle: "Build everyday skills" },
//   { id: "B1", title: "Intermediate", subtitle: "Communicate independently" },
//   { id: "B2", title: "Upper intermediate", subtitle: "Speak with confidence" },
//   { id: "C1", title: "Advanced", subtitle: "Use the language fluently" },
//   { id: "C2", title: "Proficient", subtitle: "Master subtle meanings" },
// ];

// // ------------------------------------------------------
// // ADAPTIVE LESSON CONTENT
// // ------------------------------------------------------

// const COLORS = {
//   letters: { color: "#4386DE", light: "#E9F2FF" },
//   pronunciation: { color: "#8067D8", light: "#EEE9FF" },
//   vocabulary: { color: "#D98532", light: "#FFF0DD" },
//   grammar: { color: "#E8569A", light: "#FDE4F0" },
//   listening: { color: "#249FAD", light: "#E1F7FA" },
//   conversation: { color: "#39A86B", light: "#E8F8EF" },
//   reading: { color: "#CA7B39", light: "#FFF0E3" },
//   writing: { color: "#6475D7", light: "#EAEDFF" },
// };

// function createLessons(language: Language, level: string): Lesson[] {
//   const isBeginner = level === "A1" || level === "A2";

//   const lesson = (
//     id: string,
//     title: string,
//     description: string,
//     icon: IconName,
//     color: string,
//     lightColor: string,
//     examples: string[],
//     tip: string,
//     duration = "8 min"
//   ): Lesson => ({
//     id,
//     title,
//     description,
//     icon,
//     color,
//     lightColor,
//     duration,
//     examples,
//     tip,
//   });

//   // ENGLISH: letters, vowel sounds, consonants and practical language.
//   if (language.id === "english") {
//     return [
//       lesson(
//         "letters",
//         "English Letters",
//         "Learn the 26 letters of the alphabet",
//         "text",
//         COLORS.letters.color,
//         COLORS.letters.light,
//         ["A a", "B b", "C c", "D d", "E e"],
//         "Learn uppercase and lowercase letters together."
//       ),
//       lesson(
//         "vowels",
//         "Vowel Sounds",
//         "Explore vowel letters and their sounds",
//         "volume-high",
//         COLORS.pronunciation.color,
//         COLORS.pronunciation.light,
//         ["A — apple", "E — egg", "I — sit", "O — hot", "U — sun"],
//         "Vowel letters can make different sounds in different words."
//       ),
//       lesson(
//         "consonants",
//         "Consonants",
//         "Recognise consonants in simple words",
//         "grid",
//         COLORS.writing.color,
//         COLORS.writing.light,
//         ["B — ball", "M — moon", "S — sun", "T — tree"],
//         "Say the sound of a letter while looking at a familiar word."
//       ),
//       lesson(
//         "pronunciation",
//         "Pronunciation",
//         "Practise clear and natural speech",
//         "mic",
//         COLORS.pronunciation.color,
//         COLORS.pronunciation.light,
//         ["Hello", "Thank you", "Good morning"],
//         "Listen, repeat, and speak slowly before increasing your speed."
//       ),
//       lesson(
//         "vocabulary",
//         "Vocabulary",
//         "Learn useful words for everyday life",
//         "book",
//         COLORS.vocabulary.color,
//         COLORS.vocabulary.light,
//         ["Apple — a fruit", "Happy — feeling good", "Learn — gain knowledge"],
//         "Learn new words in sentences instead of memorising isolated lists."
//       ),
//       lesson(
//         "grammar",
//         "Grammar Basics",
//         "Build simple and correct sentences",
//         "construct",
//         COLORS.grammar.color,
//         COLORS.grammar.light,
//         ["I am a student.", "She is happy.", "They are friends."],
//         "Start with subject + verb + other information."
//       ),
//       lesson(
//         "reading",
//         "Reading Practice",
//         "Read short words and simple sentences",
//         "book-outline",
//         COLORS.reading.color,
//         COLORS.reading.light,
//         ["I like books.", "This is my pen.", "We learn English."],
//         "Read a sentence aloud and identify words you already know."
//       ),
//       lesson(
//         "writing",
//         "Writing Practice",
//         "Write letters, words and short sentences",
//         "create-outline",
//         COLORS.writing.color,
//         COLORS.writing.light,
//         ["My name is …", "I live in …", "I like …"],
//         "Write a few original sentences using words from your lesson."
//       ),
//       lesson(
//         "listening",
//         "Listening",
//         "Understand common words and phrases",
//         "headset",
//         COLORS.listening.color,
//         COLORS.listening.light,
//         ["Hello!", "How are you?", "See you later!"],
//         "Listen for the main idea first; you do not need to understand every word."
//       ),
//       lesson(
//         "conversation",
//         "Conversation",
//         "Practise everyday communication",
//         "chatbubbles",
//         COLORS.conversation.color,
//         COLORS.conversation.light,
//         ["Hi! How are you?", "I am fine, thank you.", "What is your name?"],
//         "Practise both sides of a short conversation aloud."
//       ),
//     ];
//   }

//   // KOREAN: actual Hangul content.
//   if (language.id === "korean") {
//     return [
//       lesson(
//         "letters",
//         "Hangul Vowels",
//         "Start learning Korean vowel letters",
//         "text",
//         COLORS.letters.color,
//         COLORS.letters.light,
//         ["ㅏ — a", "ㅓ — eo", "ㅗ — o", "ㅜ — u", "ㅡ — eu", "ㅣ — i"],
//         "Romanisation is only a pronunciation guide; practise the Hangul letters themselves."
//       ),
//       lesson(
//         "consonants",
//         "Hangul Consonants",
//         "Meet the basic Korean consonants",
//         "grid",
//         COLORS.writing.color,
//         COLORS.writing.light,
//         ["ㄱ — g/k", "ㄴ — n", "ㄷ — d/t", "ㄹ — r/l", "ㅁ — m", "ㅂ — b/p"],
//         "Korean consonant pronunciation can change depending on its position."
//       ),
//       lesson(
//         "syllables",
//         "Build Syllables",
//         "Combine vowels and consonants",
//         "extension-puzzle",
//         COLORS.pronunciation.color,
//         COLORS.pronunciation.light,
//         ["가 — ga", "나 — na", "다 — da", "한 — han"],
//         "Hangul letters are arranged into syllable blocks."
//       ),
//       lesson(
//         "pronunciation",
//         "Korean Pronunciation",
//         "Practise common Korean sounds",
//         "volume-high",
//         COLORS.pronunciation.color,
//         COLORS.pronunciation.light,
//         ["안녕 — annyeong", "네 — ne", "아니요 — aniyo"],
//         "Listen to native-speaker audio when available; romanisation is approximate."
//       ),
//       lesson(
//         "vocabulary",
//         "Daily Vocabulary",
//         "Learn words you can use every day",
//         "book",
//         COLORS.vocabulary.color,
//         COLORS.vocabulary.light,
//         ["안녕하세요 — Hello", "감사합니다 — Thank you", "물 — Water"],
//         "Learn each word with its Hangul spelling and pronunciation."
//       ),
//       lesson(
//         "grammar",
//         "Korean Grammar",
//         "Understand simple Korean sentence patterns",
//         "construct",
//         COLORS.grammar.color,
//         COLORS.grammar.light,
//         ["저는 학생이에요. — I am a student.", "물이에요. — It is water."],
//         "Korean often places the verb or descriptive ending at the end of a sentence."
//       ),
//       lesson(
//         "reading",
//         "Read Hangul",
//         "Read simple Korean syllables and words",
//         "book-outline",
//         COLORS.reading.color,
//         COLORS.reading.light,
//         ["가", "나", "바다 — sea", "학교 — school"],
//         "Read the Hangul first, then check the meaning."
//       ),
//       lesson(
//         "writing",
//         "Write Hangul",
//         "Practise Korean letter shapes",
//         "create-outline",
//         COLORS.writing.color,
//         COLORS.writing.light,
//         ["ㅏ", "ㄴ", "가", "나"],
//         "Follow the correct stroke order when learning each letter."
//       ),
//       lesson(
//         "listening",
//         "Korean Listening",
//         "Recognise greetings and familiar words",
//         "headset",
//         COLORS.listening.color,
//         COLORS.listening.light,
//         ["안녕하세요", "네", "감사합니다"],
//         "Repeat short phrases and pay attention to sound differences."
//       ),
//       lesson(
//         "conversation",
//         "Daily Conversation",
//         "Practise a simple Korean exchange",
//         "chatbubbles",
//         COLORS.conversation.color,
//         COLORS.conversation.light,
//         ["안녕하세요! — Hello!", "이름이 뭐예요? — What is your name?", "감사합니다! — Thank you!"],
//         "Practise polite expressions first."
//       ),
//     ];
//   }

//   // JAPANESE: start with Hiragana and practical phrases.
//   if (language.id === "japanese") {
//     return [
//       lesson("letters", "Hiragana", "Learn the first Japanese script", "text", COLORS.letters.color, COLORS.letters.light, ["あ — a", "い — i", "う — u", "え — e", "お — o"], "Begin with Hiragana before tackling more complex writing."),
//       lesson("consonants", "Kana Sounds", "Practise basic kana sound patterns", "grid", COLORS.writing.color, COLORS.writing.light, ["か — ka", "き — ki", "く — ku", "け — ke", "こ — ko"], "Learn kana together with their sounds."),
//       lesson("syllables", "Build Kana Words", "Combine kana into simple words", "extension-puzzle", COLORS.pronunciation.color, COLORS.pronunciation.light, ["ねこ — cat", "すし — sushi", "さくら — cherry blossom"], "Read each kana in order."),
//       lesson("pronunciation", "Pronunciation", "Practise Japanese vowel sounds", "volume-high", COLORS.pronunciation.color, COLORS.pronunciation.light, ["あ — a", "い — i", "う — u", "え — e", "お — o"], "Japanese vowel sounds are generally consistent."),
//       lesson("vocabulary", "Daily Vocabulary", "Learn useful Japanese words", "book", COLORS.vocabulary.color, COLORS.vocabulary.light, ["水 (みず) — water", "本 (ほん) — book", "猫 (ねこ) — cat"], "Study the word, reading and meaning together."),
//       lesson("grammar", "Grammar Basics", "Build simple Japanese sentences", "construct", COLORS.grammar.color, COLORS.grammar.light, ["私は学生です。— I am a student."], "Japanese commonly places the verb at the end."),
//       lesson("reading", "Reading Practice", "Read simple kana and familiar words", "book-outline", COLORS.reading.color, COLORS.reading.light, ["あい", "ねこ", "すし"], "Start with Hiragana and gradually add new scripts."),
//       lesson("writing", "Writing Practice", "Practise writing kana", "create-outline", COLORS.writing.color, COLORS.writing.light, ["あ", "い", "う"], "Pay attention to stroke order."),
//       lesson("listening", "Listening", "Recognise common expressions", "headset", COLORS.listening.color, COLORS.listening.light, ["こんにちは — Hello", "ありがとう — Thank you"], "Listen to natural audio and repeat short phrases."),
//       lesson("conversation", "Conversation", "Practise polite introductions", "chatbubbles", COLORS.conversation.color, COLORS.conversation.light, ["こんにちは — Hello", "お名前は？ — Your name?"], "Start with short, polite exchanges."),
//     ];
//   }

//   // CHINESE: use Chinese characters and Pinyin.
//   if (language.id === "chinese") {
//     return [
//       lesson("letters", "Pinyin Basics", "Learn how Chinese sounds are written", "text", COLORS.letters.color, COLORS.letters.light, ["a", "o", "e", "i", "u", "ü"], "Pinyin uses Latin letters as a pronunciation guide; Chinese writing uses characters."),
//       lesson("consonants", "Initial Sounds", "Explore common Pinyin initials", "grid", COLORS.writing.color, COLORS.writing.light, ["b", "p", "m", "f", "d", "t"], "Some sounds differ from their usual English pronunciation."),
//       lesson("syllables", "Build Syllables", "Combine initials, finals and tones", "extension-puzzle", COLORS.pronunciation.color, COLORS.pronunciation.light, ["mā", "má", "mǎ", "mà"], "Tones can change a word's meaning."),
//       lesson("pronunciation", "Tones", "Hear the four main Mandarin tones", "volume-high", COLORS.pronunciation.color, COLORS.pronunciation.light, ["mā", "má", "mǎ", "mà"], "Listen carefully to tone and pitch movement."),
//       lesson("vocabulary", "Daily Vocabulary", "Learn practical Chinese words", "book", COLORS.vocabulary.color, COLORS.vocabulary.light, ["你好 — nǐ hǎo — hello", "谢谢 — xièxie — thank you", "水 — shuǐ — water"], "Learn characters, Pinyin and meaning together."),
//       lesson("grammar", "Grammar Basics", "Build simple Mandarin sentences", "construct", COLORS.grammar.color, COLORS.grammar.light, ["我是学生。— I am a student."], "Mandarin word order often resembles English, but grammar rules differ."),
//       lesson("reading", "Read Characters", "Recognise common Chinese characters", "book-outline", COLORS.reading.color, COLORS.reading.light, ["人 — person", "口 — mouth", "水 — water"], "Learn characters in meaningful words."),
//       lesson("writing", "Write Characters", "Practise character structure", "create-outline", COLORS.writing.color, COLORS.writing.light, ["人", "口", "日"], "Practise stroke order and character proportions."),
//       lesson("listening", "Listening", "Recognise greetings and common words", "headset", COLORS.listening.color, COLORS.listening.light, ["你好", "谢谢", "再见"], "Listen for both the word and its tone."),
//       lesson("conversation", "Conversation", "Practise everyday Mandarin", "chatbubbles", COLORS.conversation.color, COLORS.conversation.light, ["你好！— Hello!", "你好吗？— How are you?", "我很好。— I am fine."], "Speak in short phrases and pay attention to tones."),
//     ];
//   }

//   // Spanish, French and German: Latin alphabet with language-specific examples.
//   const content: Record<string, { vowels: string[]; consonants: string[]; words: string[]; sentences: string[]; phrase: string[] }> = {
//     spanish: {
//       vowels: ["A — amigo", "E — elefante", "I — isla", "O — oso", "U — uva"],
//       consonants: ["M — mamá", "P — padre", "S — sol", "L — libro"],
//       words: ["Hola — Hello", "Gracias — Thank you", "Agua — Water"],
//       sentences: ["Me llamo Ana. — My name is Ana.", "Soy estudiante. — I am a student."],
//       phrase: ["¡Hola! — Hello!", "¿Cómo estás? — How are you?", "Estoy bien. — I am fine."],
//     },
//     french: {
//       vowels: ["A — ami", "E — école", "I — ici", "O — orange", "U — lune"],
//       consonants: ["M — maman", "P — père", "S — soleil", "L — livre"],
//       words: ["Bonjour — Hello", "Merci — Thank you", "Eau — Water"],
//       sentences: ["Je m'appelle Ana. — My name is Ana.", "Je suis étudiant(e). — I am a student."],
//       phrase: ["Bonjour ! — Hello!", "Comment ça va ? — How are you?", "Ça va bien. — I am fine."],
//     },
//     german: {
//       vowels: ["A — Apfel", "E — Ente", "I — Igel", "O — Ofen", "U — Uhr"],
//       consonants: ["M — Mutter", "V — Vater", "S — Sonne", "B — Buch"],
//       words: ["Hallo — Hello", "Danke — Thank you", "Wasser — Water"],
//       sentences: ["Ich heiße Ana. — My name is Ana.", "Ich bin Student(in). — I am a student."],
//       phrase: ["Hallo! — Hello!", "Wie geht's? — How are you?", "Mir geht's gut. — I am fine."],
//     },
//   };

//   const c = content[language.id] || content.spanish;

//   return [
//     lesson("letters", `${language.name} Alphabet`, "Explore letters and familiar words", "text", COLORS.letters.color, COLORS.letters.light, c.vowels, "Practise letter names and how they sound in real words."),
//     lesson("consonants", "Consonants", "Recognise consonants in simple words", "grid", COLORS.writing.color, COLORS.writing.light, c.consonants, "Some letters sound different depending on the word."),
//     lesson("pronunciation", "Pronunciation", "Practise sounds and clear speech", "volume-high", COLORS.pronunciation.color, COLORS.pronunciation.light, c.vowels.slice(0, 4), "Listen to the language and repeat the sound."),
//     lesson("vocabulary", "Daily Vocabulary", "Learn useful everyday words", "book", COLORS.vocabulary.color, COLORS.vocabulary.light, c.words, "Practise each word inside a short sentence."),
//     lesson("grammar", "Grammar Basics", "Build simple sentences", "construct", COLORS.grammar.color, COLORS.grammar.light, c.sentences, "Learn sentence patterns by using them, not only memorising rules."),
//     lesson("reading", "Reading Practice", "Read simple words and sentences", "book-outline", COLORS.reading.color, COLORS.reading.light, c.sentences, "Read slowly and identify familiar words."),
//     lesson("writing", "Writing Practice", "Write short personal sentences", "create-outline", COLORS.writing.color, COLORS.writing.light, ["My name is …", "I live in …", "I like …"], "Use the language's own vocabulary and grammar."),
//     lesson("listening", "Listening", "Recognise familiar expressions", "headset", COLORS.listening.color, COLORS.listening.light, c.phrase, "Listen to short phrases several times."),
//     lesson("conversation", "Conversation", "Practise a short conversation", "chatbubbles", COLORS.conversation.color, COLORS.conversation.light, c.phrase, "Read both sides aloud, then practise without looking."),
//   ];
// }

// // ------------------------------------------------------
// // DASHBOARD
// // ------------------------------------------------------

// export default function DashboardScreen() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [language, setLanguage] = useState<Language | null>(null);
//   const [level, setLevel] = useState<string | null>(null);
//   const [screen, setScreen] = useState<"language" | "level" | "home">("language");
//   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
//   const [completedLessons, setCompletedLessons] = useState<string[]>([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     loadSavedPreferences();
//   }, []);

//   async function loadSavedPreferences() {
//     try {
//       const savedLanguage = await AsyncStorage.getItem("tragoLanguage");
//       const savedLevel = await AsyncStorage.getItem("tragoLevel");
//       const savedCompleted = await AsyncStorage.getItem("tragoCompletedLessons");

//       if (savedCompleted) {
//         setCompletedLessons(JSON.parse(savedCompleted));
//       }

//       if (savedLanguage) {
//         const parsedLanguage = JSON.parse(savedLanguage);
//         const match = LANGUAGES.find(
//           (item) =>
//             item.id === parsedLanguage.id ||
//             item.name === parsedLanguage.name
//         );

//         if (match) {
//           setLanguage(match);

//           if (savedLevel) {
//             const parsedLevel = JSON.parse(savedLevel);
//             const levelId =
//               typeof parsedLevel === "string"
//                 ? parsedLevel
//                 : parsedLevel.id;

//             if (LEVELS.some((item) => item.id === levelId)) {
//               setLevel(levelId);
//               setScreen("home");
//             } else {
//               setScreen("level");
//             }
//           } else {
//             setScreen("level");
//           }
//         }
//       }
//     } catch (error) {
//       console.warn("Could not load Trago preferences:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function chooseLanguage(item: Language) {
//     setLanguage(item);
//     setLevel(null);
//     setScreen("level");
//     setSelectedLesson(null);

//     try {
//       await AsyncStorage.setItem("tragoLanguage", JSON.stringify(item));
//       await AsyncStorage.removeItem("tragoLevel");
//     } catch (error) {
//       console.warn("Could not save language:", error);
//     }
//   }

//   async function chooseLevel(item: Level) {
//     if (!language) {
//       setScreen("language");
//       return;
//     }

//     setLevel(item.id);
//     setScreen("home");

//     try {
//       await AsyncStorage.setItem("tragoLevel", JSON.stringify(item));
//     } catch (error) {
//       console.warn("Could not save level:", error);
//     }
//   }

//   async function changeLanguage() {
//     setScreen("language");
//     setSelectedLesson(null);
//   }

//   async function changeLevel() {
//     setScreen("level");
//     setSelectedLesson(null);
//   }

//   const lessons = useMemo(
//     () => (language && level ? createLessons(language, level) : []),
//     [language, level]
//   );

//   const visibleLessons = showAll ? lessons : lessons.slice(0, 6);
//   const completedCount = lessons.filter((item) =>
//     completedLessons.includes(item.id)
//   ).length;
//   const progress =
//     lessons.length > 0 ? completedCount / lessons.length : 0;

//   async function markComplete(lesson: Lesson) {
//     const alreadyCompleted = completedLessons.includes(lesson.id);

//     const updated = alreadyCompleted
//       ? completedLessons
//       : [...completedLessons, lesson.id];

//     setCompletedLessons(updated);

//     try {
//       await AsyncStorage.setItem(
//         "tragoCompletedLessons",
//         JSON.stringify(updated)
//       );
//     } catch (error) {
//       console.warn("Could not save lesson progress:", error);
//     }

//     setSelectedLesson(null);
//   }

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingScreen}>
//         <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />
//         <View style={styles.logoCircle}>
//           <Ionicons name="school-outline" size={34} color={TEAL} />
//         </View>
//         <Text style={styles.brand}>TRAGO</Text>
//         <ActivityIndicator color={TEAL} size="large" />
//         <Text style={styles.loadingText}>Preparing your learning space…</Text>
//       </SafeAreaView>
//     );
//   }

//   // ----------------------------------------------------
//   // STEP 1 — LANGUAGE CHOOSER
//   // ----------------------------------------------------

//   if (screen === "language") {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />
//         <ScrollView contentContainerStyle={styles.selectionContainer}>
//           <View style={styles.brandRow}>
//             <View style={styles.logoSmall}>
//               <Ionicons name="school-outline" size={25} color={WHITE} />
//             </View>
//             <Text style={styles.brand}>TRAGO</Text>
//           </View>

//           <Text style={styles.stepLabel}>STEP 1 OF 2</Text>
//           <Text style={styles.selectionTitle}>What do you want to learn?</Text>
//           <Text style={styles.selectionSubtitle}>
//             Choose a language to build your personalised learning path.
//           </Text>

//           <View style={styles.languageGrid}>
//             {LANGUAGES.map((item) => {
//               const isSelected = language?.id === item.id;

//               return (
//                 <TouchableOpacity
//                   key={item.id}
//                   activeOpacity={0.8}
//                   onPress={() => chooseLanguage(item)}
//                   style={[
//                     styles.languageCard,
//                     isSelected && styles.selectedLanguageCard,
//                   ]}
//                 >
//                   <Text style={styles.flag}>{item.flag}</Text>
//                   <Text style={styles.languageName}>{item.name}</Text>
//                   <Text style={styles.languageNative}>{item.native}</Text>
//                   <View style={styles.languageCardBottom}>
//                     <Text style={styles.languageScript} numberOfLines={2}>
//                       {item.script}
//                     </Text>
//                     <Ionicons
//                       name="chevron-forward-circle"
//                       size={23}
//                       color={isSelected ? TEAL : "#B6C8C4"}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           <View style={styles.infoBanner}>
//             <Ionicons name="sparkles-outline" size={21} color={TEAL_DARK} />
//             <Text style={styles.infoText}>
//               Your lessons will change automatically to match your selected
//               language.
//             </Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }

//   // ----------------------------------------------------
//   // STEP 2 — LEVEL CHOOSER
//   // ----------------------------------------------------

//   if (screen === "level") {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />
//         <ScrollView contentContainerStyle={styles.selectionContainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => setScreen("language")}
//           >
//             <Ionicons name="arrow-back" size={21} color={TEXT} />
//             <Text style={styles.backButtonText}>Change language</Text>
//           </TouchableOpacity>

//           <View style={styles.brandRow}>
//             <View style={styles.logoSmall}>
//               <Ionicons name="school-outline" size={25} color={WHITE} />
//             </View>
//             <Text style={styles.brand}>TRAGO</Text>
//           </View>

//           <Text style={styles.stepLabel}>STEP 2 OF 2</Text>
//           <Text style={styles.selectionTitle}>Where are you right now?</Text>
//           <Text style={styles.selectionSubtitle}>
//             Choose your current level in {language?.name}. You can change it
//             later.
//           </Text>

//           <View style={styles.chosenLanguageBanner}>
//             <Text style={styles.chosenLanguageFlag}>{language?.flag}</Text>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.chosenLanguageTitle}>
//                 {language?.name}
//               </Text>
//               <Text style={styles.chosenLanguageSub}>
//                 {language?.script}
//               </Text>
//             </View>
//             <Ionicons name="checkmark-circle" size={25} color={TEAL} />
//           </View>

//           {LEVELS.map((item, index) => {
//             const isSelected = level === item.id;

//             return (
//               <TouchableOpacity
//                 key={item.id}
//                 activeOpacity={0.8}
//                 onPress={() => chooseLevel(item)}
//                 style={[
//                   styles.levelCard,
//                   isSelected && styles.selectedLevelCard,
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.levelBadge,
//                     { backgroundColor: index < 2 ? "#DDF7F3" : "#E9F2FF" },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.levelBadgeText,
//                       { color: index < 2 ? TEAL_DARK : "#4386DE" },
//                     ]}
//                   >
//                     {item.id}
//                   </Text>
//                 </View>

//                 <View style={styles.levelCopy}>
//                   <Text style={styles.levelTitle}>{item.title}</Text>
//                   <Text style={styles.levelSubtitle}>{item.subtitle}</Text>
//                 </View>

//                 <Ionicons
//                   name="chevron-forward"
//                   size={22}
//                   color={MUTED}
//                 />
//               </TouchableOpacity>
//             );
//           })}

//           <Text style={styles.levelHint}>
//             New to this language? Start with A1.
//           </Text>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }

//   // ----------------------------------------------------
//   // LESSON DETAIL
//   // ----------------------------------------------------

//   if (selectedLesson) {
//     const completed = completedLessons.includes(selectedLesson.id);

//     return (
//       <SafeAreaView style={styles.safe}>
//         <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />
//         <ScrollView contentContainerStyle={styles.lessonDetailContainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => setSelectedLesson(null)}
//           >
//             <Ionicons name="arrow-back" size={21} color={TEXT} />
//             <Text style={styles.backButtonText}>Back to dashboard</Text>
//           </TouchableOpacity>

//           <View
//             style={[
//               styles.lessonHero,
//               { backgroundColor: selectedLesson.lightColor },
//             ]}
//           >
//             <View
//               style={[
//                 styles.lessonHeroIcon,
//                 { backgroundColor: WHITE },
//               ]}
//             >
//               <Ionicons
//                 name={selectedLesson.icon}
//                 size={35}
//                 color={selectedLesson.color}
//               />
//             </View>
//             <Text style={styles.lessonHeroTitle}>
//               {selectedLesson.title}
//             </Text>
//             <Text style={styles.lessonHeroDescription}>
//               {selectedLesson.description}
//             </Text>
//             <View style={styles.durationPill}>
//               <Ionicons name="time-outline" size={15} color={TEXT} />
//               <Text style={styles.durationText}>
//                 {selectedLesson.duration}
//               </Text>
//             </View>
//           </View>

//           <Text style={styles.sectionTitle}>Let's practise</Text>
//           <Text style={styles.practiceIntro}>
//             These are starter examples for {language?.name}. Read each one
//             slowly and try saying it aloud.
//           </Text>

//           {selectedLesson.examples.map((example, index) => (
//             <View key={`${selectedLesson.id}-${index}`} style={styles.exampleRow}>
//               <View style={styles.exampleNumber}>
//                 <Text style={styles.exampleNumberText}>{index + 1}</Text>
//               </View>
//               <Text style={styles.exampleText}>{example}</Text>
//             </View>
//           ))}

//           <View style={styles.tipCard}>
//             <Ionicons name="bulb-outline" size={23} color="#D98532" />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.tipTitle}>Learning tip</Text>
//               <Text style={styles.tipText}>{selectedLesson.tip}</Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             activeOpacity={0.85}
//             style={[
//               styles.completeButton,
//               completed && styles.completedButton,
//             ]}
//             onPress={() => markComplete(selectedLesson)}
//           >
//             <Ionicons
//               name={completed ? "checkmark-circle" : "checkmark"}
//               size={21}
//               color={WHITE}
//             />
//             <Text style={styles.completeButtonText}>
//               {completed ? "Already completed" : "Mark lesson as complete"}
//             </Text>
//           </TouchableOpacity>

//           <Text style={styles.noteText}>
//             This lesson page provides starter examples. Audio playback,
//             interactive quizzes and full lesson exercises can be added as
//             separate features.
//           </Text>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }

//   // ----------------------------------------------------
//   // STEP 3 — ADAPTIVE DASHBOARD
//   // ----------------------------------------------------

//   const nextLesson = lessons.find(
//     (item) => !completedLessons.includes(item.id)
//   );

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.homeContainer}
//       >
//         {/* HEADER */}
//         <View style={styles.header}>
//           <View style={styles.brandRow}>
//             <View style={styles.logoSmall}>
//               <Ionicons name="school-outline" size={25} color={WHITE} />
//             </View>
//             <View>
//               <Text style={styles.brand}>TRAGO</Text>
//               <Text style={styles.headerSubtitle}>Your learning space</Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={styles.headerIconButton}
//             onPress={() =>
//               Alert.alert(
//                 "Your learning settings",
//                 "Change your language or level using the controls below."
//               )
//             }
//           >
//             <Ionicons name="settings-outline" size={22} color={TEXT} />
//           </TouchableOpacity>
//         </View>

//         {/* LANGUAGE AND LEVEL */}
//         <View style={styles.preferenceRow}>
//           <TouchableOpacity
//             style={styles.preferencePill}
//             onPress={changeLanguage}
//           >
//             <Text style={styles.preferenceFlag}>{language?.flag}</Text>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.preferenceCaption}>LEARNING</Text>
//               <Text style={styles.preferenceValue}>{language?.name}</Text>
//             </View>
//             <Ionicons name="chevron-down" size={17} color={TEAL_DARK} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.preferencePill}
//             onPress={changeLevel}
//           >
//             <View style={styles.levelMiniBadge}>
//               <Text style={styles.levelMiniBadgeText}>{level}</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.preferenceCaption}>YOUR LEVEL</Text>
//               <Text style={styles.preferenceValue}>Change level</Text>
//             </View>
//             <Ionicons name="chevron-down" size={17} color={TEAL_DARK} />
//           </TouchableOpacity>
//         </View>

//         {/* WELCOME HERO */}
//         <LinearGradient
//           colors={[TEAL, TEAL_DARK]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.welcomeCard}
//         >
//           <View style={styles.welcomeTextContainer}>
//             <Text style={styles.welcomeEyebrow}>YOUR NEXT CHAPTER STARTS HERE</Text>
//             <Text style={styles.welcomeTitle}>
//               {language?.name === "Korean"
//                 ? "안녕하세요!"
//                 : language?.name === "Japanese"
//                 ? "こんにちは!"
//                 : language?.name === "Chinese"
//                 ? "你好!"
//                 : language?.name === "French"
//                 ? "Bonjour!"
//                 : language?.name === "German"
//                 ? "Hallo!"
//                 : language?.name === "Spanish"
//                 ? "¡Hola!"
//                 : "Hello, learner!"}
//             </Text>
//             <Text style={styles.welcomeDescription}>
//               A little practice every day takes you a long way.
//             </Text>
//           </View>

//           <View style={styles.welcomeIllustration}>
//             <Ionicons name="book" size={45} color={WHITE} />
//             <View style={styles.sparkleOne}>
//               <Ionicons name="sparkles" size={17} color="#DDF7F3" />
//             </View>
//           </View>
//         </LinearGradient>

//         {/* PROGRESS */}
//         <View style={styles.progressCard}>
//           <View style={styles.progressTopRow}>
//             <View>
//               <Text style={styles.progressTitle}>Your learning journey</Text>
//               <Text style={styles.progressSubtitle}>
//                 {completedCount === 0
//                   ? "Your first lesson is waiting!"
//                   : "Every completed lesson counts."}
//               </Text>
//             </View>
//             <View style={styles.progressCircle}>
//               <Text style={styles.progressPercent}>
//                 {Math.round(progress * 100)}%
//               </Text>
//             </View>
//           </View>

//           <View style={styles.progressTrack}>
//             <View
//               style={[
//                 styles.progressFill,
//                 { width: `${Math.round(progress * 100)}%` },
//               ]}
//             />
//           </View>

//           <View style={styles.progressBottomRow}>
//             <Text style={styles.progressCount}>
//               {completedCount} of {lessons.length} lessons completed
//             </Text>
//             <Ionicons name="trending-up" size={19} color={TEAL} />
//           </View>
//         </View>

//         {/* GUIDED NEXT LESSON */}
//         {nextLesson ? (
//           <View style={styles.nextSection}>
//             <View style={styles.sectionHeadingRow}>
//               <View>
//                 <Text style={styles.sectionTitle}>Continue learning</Text>
//                 <Text style={styles.sectionSubtitle}>
//                   Your recommended next lesson
//                 </Text>
//               </View>
//               <View style={styles.guidedBadge}>
//                 <Ionicons name="compass-outline" size={15} color={TEAL_DARK} />
//                 <Text style={styles.guidedBadgeText}>GUIDED</Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.88}
//               style={styles.nextLessonCard}
//               onPress={() => setSelectedLesson(nextLesson)}
//             >
//               <View
//                 style={[
//                   styles.nextLessonIcon,
//                   { backgroundColor: nextLesson.lightColor },
//                 ]}
//               >
//                 <Ionicons
//                   name={nextLesson.icon}
//                   size={29}
//                   color={nextLesson.color}
//                 />
//               </View>

//               <View style={styles.nextLessonCopy}>
//                 <Text style={styles.nextLessonEyebrow}>NEXT UP</Text>
//                 <Text style={styles.nextLessonTitle}>{nextLesson.title}</Text>
//                 <Text style={styles.nextLessonDescription} numberOfLines={2}>
//                   {nextLesson.description}
//                 </Text>
//                 <View style={styles.nextLessonDuration}>
//                   <Ionicons name="time-outline" size={14} color={MUTED} />
//                   <Text style={styles.durationSmallText}>
//                     {nextLesson.duration}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.playCircle}>
//                 <Ionicons name="play" size={19} color={WHITE} />
//               </View>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.finishedCard}>
//             <Ionicons name="trophy" size={35} color="#D98532" />
//             <Text style={styles.finishedTitle}>Amazing progress!</Text>
//             <Text style={styles.finishedDescription}>
//               You completed every lesson in this starter path.
//             </Text>
//             <TouchableOpacity
//               style={styles.secondaryButton}
//               onPress={() =>
//                 Alert.alert(
//                   "More lessons",
//                   "You can continue practising the available categories below."
//                 )
//               }
//             >
//               <Text style={styles.secondaryButtonText}>Keep practising</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* COLORFUL LESSON CARDS */}
//         <View style={styles.sectionHeadingRow}>
//           <View>
//             <Text style={styles.sectionTitle}>Explore lessons</Text>
//             <Text style={styles.sectionSubtitle}>
//               Pick a topic and learn at your pace
//             </Text>
//           </View>
//           <TouchableOpacity onPress={() => setShowAll(!showAll)}>
//             <Text style={styles.seeAllText}>
//               {showAll ? "Show less" : "See all"}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.lessonGrid}>
//           {visibleLessons.map((item, index) => {
//             const isCompleted = completedLessons.includes(item.id);

//             return (
//               <TouchableOpacity
//                 key={item.id}
//                 activeOpacity={0.85}
//                 style={styles.lessonCard}
//                 onPress={() => setSelectedLesson(item)}
//               >
//                 <View
//                   style={[
//                     styles.lessonIcon,
//                     { backgroundColor: item.lightColor },
//                   ]}
//                 >
//                   <Ionicons
//                     name={item.icon}
//                     size={25}
//                     color={item.color}
//                   />
//                   {isCompleted && (
//                     <View style={styles.miniCheck}>
//                       <Ionicons
//                         name="checkmark"
//                         size={11}
//                         color={WHITE}
//                       />
//                     </View>
//                   )}
//                 </View>

//                 <Text style={styles.lessonCardTitle}>{item.title}</Text>
//                 <Text style={styles.lessonCardDescription} numberOfLines={2}>
//                   {item.description}
//                 </Text>

//                 <View style={styles.lessonCardBottom}>
//                   <Text style={styles.lessonCardDuration}>{item.duration}</Text>
//                   <Ionicons
//                     name={isCompleted ? "checkmark-circle" : "arrow-forward"}
//                     size={18}
//                     color={isCompleted ? TEAL : item.color}
//                   />
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* GUIDED LEARNING PATH */}
//         <View style={styles.pathSection}>
//           <Text style={styles.sectionTitle}>Your learning path</Text>
//           <Text style={styles.sectionSubtitle}>
//             Follow the suggested order or explore any lesson.
//           </Text>

//           {lessons.slice(0, 5).map((item, index) => {
//             const isCompleted = completedLessons.includes(item.id);
//             const isNext = nextLesson?.id === item.id;

//             return (
//               <TouchableOpacity
//                 key={`path-${item.id}`}
//                 style={styles.pathRow}
//                 activeOpacity={0.8}
//                 onPress={() => setSelectedLesson(item)}
//               >
//                 <View style={styles.pathTimeline}>
//                   <View
//                     style={[
//                       styles.pathNode,
//                       isCompleted && styles.pathNodeComplete,
//                       isNext && styles.pathNodeNext,
//                     ]}
//                   >
//                     {isCompleted ? (
//                       <Ionicons name="checkmark" size={15} color={WHITE} />
//                     ) : (
//                       <Text
//                         style={[
//                           styles.pathNodeText,
//                           isNext && styles.pathNodeTextNext,
//                         ]}
//                       >
//                         {index + 1}
//                       </Text>
//                     )}
//                   </View>
//                   {index < 4 && <View style={styles.pathLine} />}
//                 </View>

//                 <View style={styles.pathCopy}>
//                   <Text style={styles.pathTitle}>{item.title}</Text>
//                   <Text style={styles.pathDescription}>
//                     {isCompleted
//                       ? "Completed"
//                       : isNext
//                       ? "Recommended next"
//                       : item.duration}
//                   </Text>
//                 </View>

//                 <Ionicons
//                   name="chevron-forward"
//                   size={19}
//                   color={MUTED}
//                 />
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* FOOTER */}
//         <View style={styles.footerCard}>
//           <Ionicons name="heart-outline" size={22} color={TEAL} />
//           <View style={{ flex: 1 }}>
//             <Text style={styles.footerTitle}>Progress, not perfection.</Text>
//             <Text style={styles.footerText}>
//               Practise a little every day. You do not need to learn everything
//               at once.
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.footerBrand}>TRAGO · Learn your way</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // ------------------------------------------------------
// // STYLES
// // ------------------------------------------------------

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: BACKGROUND,
//   },
//   loadingScreen: {
//     flex: 1,
//     backgroundColor: BACKGROUND,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoCircle: {
//     width: 74,
//     height: 74,
//     borderRadius: 24,
//     backgroundColor: TEAL_LIGHT,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 15,
//   },
//   loadingText: {
//     color: MUTED,
//     fontSize: 14,
//     marginTop: 14,
//   },
//   selectionContainer: {
//     padding: 22,
//     paddingBottom: 40,
//   },
//   homeContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 36,
//   },
//   brandRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   logoSmall: {
//     width: 43,
//     height: 43,
//     borderRadius: 14,
//     backgroundColor: TEAL,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   brand: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: TEAL_DARK,
//     letterSpacing: 2,
//   },
//   headerSubtitle: {
//     color: MUTED,
//     fontSize: 11,
//     marginTop: 1,
//   },
//   stepLabel: {
//     color: TEAL_DARK,
//     fontSize: 11,
//     fontWeight: "800",
//     letterSpacing: 1.7,
//     marginTop: 32,
//     marginBottom: 10,
//   },
//   selectionTitle: {
//     fontSize: 29,
//     lineHeight: 36,
//     fontWeight: "800",
//     color: TEXT,
//     letterSpacing: -0.5,
//   },
//   selectionSubtitle: {
//     fontSize: 14,
//     lineHeight: 21,
//     color: MUTED,
//     marginTop: 10,
//     marginBottom: 24,
//   },
//   languageGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   languageCard: {
//     width: "48%",
//     minHeight: 158,
//     borderRadius: 20,
//     backgroundColor: WHITE,
//     borderWidth: 1,
//     borderColor: BORDER,
//     padding: 14,
//     justifyContent: "flex-start",
//   },
//   selectedLanguageCard: {
//     borderColor: TEAL,
//     borderWidth: 2,
//     backgroundColor: "#F3FFFC",
//   },
//   flag: {
//     fontSize: 28,
//     marginBottom: 9,
//   },
//   languageName: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: TEXT,
//   },
//   languageNative: {
//     color: MUTED,
//     fontSize: 12,
//     marginTop: 3,
//   },
//   languageCardBottom: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 5,
//     marginTop: "auto",
//     paddingTop: 12,
//   },
//   languageScript: {
//     flex: 1,
//     color: MUTED,
//     fontSize: 10,
//     lineHeight: 14,
//   },
//   infoBanner: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginTop: 22,
//     padding: 15,
//     backgroundColor: TEAL_LIGHT,
//     borderRadius: 16,
//   },
//   infoText: {
//     flex: 1,
//     color: TEAL_DARK,
//     fontSize: 13,
//     lineHeight: 19,
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     gap: 8,
//     paddingVertical: 9,
//     marginBottom: 17,
//   },
//   backButtonText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: TEXT,
//   },
//   chosenLanguageBanner: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: TEAL_LIGHT,
//     borderRadius: 17,
//     padding: 15,
//     marginBottom: 20,
//     gap: 12,
//   },
//   chosenLanguageFlag: {
//     fontSize: 29,
//   },
//   chosenLanguageTitle: {
//     color: TEAL_DARK,
//     fontWeight: "800",
//     fontSize: 16,
//   },
//   chosenLanguageSub: {
//     color: TEAL_DARK,
//     fontSize: 12,
//     marginTop: 3,
//   },
//   levelCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: WHITE,
//     borderWidth: 1,
//     borderColor: BORDER,
//     borderRadius: 18,
//     padding: 14,
//     marginBottom: 11,
//     gap: 13,
//   },
//   selectedLevelCard: {
//     borderColor: TEAL,
//     backgroundColor: "#F3FFFC",
//     borderWidth: 2,
//   },
//   levelBadge: {
//     width: 49,
//     height: 49,
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   levelBadgeText: {
//     fontWeight: "900",
//     fontSize: 15,
//   },
//   levelCopy: {
//     flex: 1,
//   },
//   levelTitle: {
//     fontWeight: "800",
//     fontSize: 14,
//     color: TEXT,
//   },
//   levelSubtitle: {
//     fontSize: 12,
//     color: MUTED,
//     marginTop: 5,
//   },
//   levelHint: {
//     color: MUTED,
//     textAlign: "center",
//     fontSize: 12,
//     marginTop: 12,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   headerIconButton: {
//     width: 43,
//     height: 43,
//     borderRadius: 15,
//     backgroundColor: WHITE,
//     borderWidth: 1,
//     borderColor: BORDER,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   preferenceRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 17,
//   },
//   preferencePill: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//     minHeight: 65,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 16,
//     backgroundColor: WHITE,
//     borderWidth: 1,
//     borderColor: BORDER,
//   },
//   preferenceFlag: {
//     fontSize: 23,
//   },
//   preferenceCaption: {
//     fontSize: 9,
//     fontWeight: "800",
//     color: MUTED,
//     letterSpacing: 0.6,
//   },
//   preferenceValue: {
//     color: TEXT,
//     fontWeight: "800",
//     fontSize: 12,
//     marginTop: 4,
//   },
//   levelMiniBadge: {
//     width: 36,
//     height: 36,
//     borderRadius: 11,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: TEAL_LIGHT,
//   },
//   levelMiniBadgeText: {
//     color: TEAL_DARK,
//     fontWeight: "900",
//     fontSize: 12,
//   },
//   welcomeCard: {
//     minHeight: 176,
//     borderRadius: 25,
//     padding: 21,
//     flexDirection: "row",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   welcomeTextContainer: {
//     flex: 1,
//   },
//   welcomeEyebrow: {
//     color: "#D8FAF4",
//     fontSize: 9,
//     fontWeight: "800",
//     letterSpacing: 1.2,
//     marginBottom: 12,
//   },
//   welcomeTitle: {
//     color: WHITE,
//     fontSize: 27,
//     fontWeight: "900",
//     letterSpacing: -0.4,
//   },
//   welcomeDescription: {
//     color: "#E2F9F5",
//     fontSize: 12,
//     lineHeight: 18,
//     marginTop: 8,
//     maxWidth: 230,
//   },
//   welcomeIllustration: {
//     width: 74,
//     height: 84,
//     borderRadius: 23,
//     backgroundColor: "rgba(255,255,255,0.16)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 7,
//   },
//   sparkleOne: {
//     position: "absolute",
//     top: 8,
//     right: 7,
//   },
//   progressCard: {
//     backgroundColor: WHITE,
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: BORDER,
//     padding: 17,
//     marginTop: 17,
//     marginBottom: 26,
//   },
//   progressTopRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   progressTitle: {
//     color: TEXT,
//     fontWeight: "800",
//     fontSize: 15,
//   },
//   progressSubtitle: {
//     color: MUTED,
//     fontSize: 12,
//     marginTop: 5,
//   },
//   progressCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: TEAL_LIGHT,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   progressPercent: {
//     color: TEAL_DARK,
//     fontWeight: "900",
//     fontSize: 12,
//   },
//   progressTrack: {
//     height: 8,
//     backgroundColor: "#EAF1EF",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginTop: 17,
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: TEAL,
//     borderRadius: 10,
//   },
//   progressBottomRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 11,
//   },
//   progressCount: {
//     color: MUTED,
//     fontSize: 11,
//   },
//   nextSection: {
//     marginBottom: 27,
//   },
//   sectionHeadingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 14,
//   },
//   sectionTitle: {
//     color: TEXT,
//     fontWeight: "900",
//     fontSize: 19,
//     letterSpacing: -0.3,
//   },
//   sectionSubtitle: {
//     color: MUTED,
//     fontSize: 12,
//     marginTop: 5,
//     lineHeight: 17,
//   },
//   guidedBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     backgroundColor: TEAL_LIGHT,
//     paddingHorizontal: 9,
//     paddingVertical: 6,
//     borderRadius: 9,
//   },
//   guidedBadgeText: {
//     color: TEAL_DARK,
//     fontSize: 9,
//     fontWeight: "900",
//     letterSpacing: 0.5,
//   },
//   nextLessonCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: WHITE,
//     borderRadius: 21,
//     borderWidth: 1,
//     borderColor: BORDER,
//     padding: 14,
//     gap: 12,
//   },
//   nextLessonIcon: {
//     width: 57,
//     height: 57,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   nextLessonCopy: {
//     flex: 1,
//   },
//   nextLessonEyebrow: {
//     color: TEAL_DARK,
//     fontSize: 9,
//     fontWeight: "900",
//     letterSpacing: 1,
//     marginBottom: 5,
//   },
//   nextLessonTitle: {
//     color: TEXT,
//     fontSize: 15,
//     fontWeight: "900",
//   },
//   nextLessonDescription: {
//     color: MUTED,
//     fontSize: 11,
//     lineHeight: 16,
//     marginTop: 4,
//   },
//   nextLessonDuration: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginTop: 8,
//   },
//   durationSmallText: {
//     color: MUTED,
//     fontSize: 10,
//   },
//   playCircle: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: TEAL,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   seeAllText: {
//     color: TEAL_DARK,
//     fontWeight: "800",
//     fontSize: 12,
//   },
//   lessonGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     rowGap: 12,
//     marginBottom: 28,
//   },
//   lessonCard: {
//     width: "48.3%",
//     minHeight: 174,
//     padding: 14,
//     borderRadius: 20,
//     backgroundColor: WHITE,
//     borderWidth: 1,
//     borderColor: BORDER,
//   },
//   lessonIcon: {
//     width: 47,
//     height: 47,
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   miniCheck: {
//     position: "absolute",
//     right: -4,
//     top: -4,
//     width: 17,
//     height: 17,
//     borderRadius: 9,
//     backgroundColor: TEAL,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   lessonCardTitle: {
//     color: TEXT,
//     fontWeight: "800",
//     fontSize: 14,
//   },
//   lessonCardDescription: {
//     color: MUTED,
//     fontSize: 11,
//     lineHeight: 16,
//     marginTop: 5,
//     flex: 1,
//   },
//   lessonCardBottom: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 12,
//   },
//   lessonCardDuration: {
//     color: MUTED,
//     fontSize: 10,
//   },
//   pathSection: {
//     marginBottom: 24,
//   },
//   pathRow: {
//     minHeight: 65,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//   },
//   pathTimeline: {
//     width: 31,
//     alignItems: "center",
//     alignSelf: "stretch",
//   },
//   pathNode: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: WHITE,
//     borderWidth: 1.5,
//     borderColor: BORDER,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1,
//   },
//   pathNodeComplete: {
//     backgroundColor: TEAL,
//     borderColor: TEAL,
//   },
//   pathNodeNext: {
//     backgroundColor: TEAL_LIGHT,
//     borderColor: TEAL,
//   },
//   pathNodeText: {
//     color: MUTED,
//     fontWeight: "800",
//     fontSize: 11,
//   },
//   pathNodeTextNext: {
//     color: TEAL_DARK,
//   },
//   pathLine: {
//     width: 2,
//     flex: 1,
//     minHeight: 28,
//     backgroundColor: "#DCEAE6",
//     position: "absolute",
//     top: 28,
//   },
//   pathCopy: {
//     flex: 1,
//     paddingVertical: 12,
//   },
//   pathTitle: {
//     color: TEXT,
//     fontSize: 13,
//     fontWeight: "800",
//   },
//   pathDescription: {
//     color: MUTED,
//     fontSize: 11,
//     marginTop: 4,
//   },
//   footerCard: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 12,
//     padding: 17,
//     backgroundColor: TEAL_LIGHT,
//     borderRadius: 18,
//   },
//   footerTitle: {
//     color: TEAL_DARK,
//     fontWeight: "900",
//     fontSize: 13,
//   },
//   footerText: {
//     color: TEAL_DARK,
//     fontSize: 12,
//     lineHeight: 18,
//     marginTop: 5,
//   },
//   footerBrand: {
//     textAlign: "center",
//     color: "#A1B1AD",
//     fontSize: 10,
//     letterSpacing: 1,
//     marginTop: 23,
//   },
//   finishedCard: {
//     backgroundColor: WHITE,
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: BORDER,
//     alignItems: "center",
//     padding: 23,
//     marginBottom: 25,
//   },
//   finishedTitle: {
//     color: TEXT,
//     fontSize: 18,
//     fontWeight: "900",
//     marginTop: 10,
//   },
//   finishedDescription: {
//     color: MUTED,
//     textAlign: "center",
//     fontSize: 12,
//     lineHeight: 18,
//     marginTop: 6,
//   },
//   secondaryButton: {
//     backgroundColor: TEAL_LIGHT,
//     paddingHorizontal: 18,
//     paddingVertical: 11,
//     borderRadius: 12,
//     marginTop: 15,
//   },
//   secondaryButtonText: {
//     color: TEAL_DARK,
//     fontWeight: "800",
//     fontSize: 12,
//   },
//   lessonDetailContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   lessonHero: {
//     alignItems: "flex-start",
//     borderRadius: 24,
//     padding: 23,
//     marginBottom: 26,
//   },
//   lessonHeroIcon: {
//     width: 64,
//     height: 64,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },
//   lessonHeroTitle: {
//     color: TEXT,
//     fontSize: 26,
//     fontWeight: "900",
//   },
//   lessonHeroDescription: {
//     color: TEXT,
//     opacity: 0.75,
//     fontSize: 13,
//     lineHeight: 20,
//     marginTop: 8,
//   },
//   durationPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     backgroundColor: "rgba(255,255,255,0.75)",
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//     borderRadius: 10,
//     marginTop: 14,
//   },
//   durationText: {
//     color: TEXT,
//     fontSize: 11,
//     fontWeight: "700",
//   },
//   practiceIntro: {
//     color: MUTED,
//     fontSize: 13,
//     lineHeight: 20,
//     marginTop: 7,
//     marginBottom: 15,
//   },
//   exampleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//     padding: 15,
//     borderRadius: 16,
//     backgroundColor: WHITE,
//     borderWidth: 1,
//     borderColor: BORDER,
//     marginBottom: 10,
//   },
//   exampleNumber: {
//     width: 31,
//     height: 31,
//     borderRadius: 11,
//     backgroundColor: TEAL_LIGHT,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   exampleNumberText: {
//     color: TEAL_DARK,
//     fontWeight: "900",
//     fontSize: 12,
//   },
//   exampleText: {
//     flex: 1,
//     color: TEXT,
//     fontSize: 15,
//     fontWeight: "700",
//     lineHeight: 23,
//   },
//   tipCard: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 11,
//     padding: 16,
//     backgroundColor: "#FFF8ED",
//     borderRadius: 17,
//     marginTop: 12,
//   },
//   tipTitle: {
//     color: "#9A5D1B",
//     fontWeight: "900",
//     fontSize: 13,
//     marginBottom: 5,
//   },
//   tipText: {
//     color: "#775E43",
//     fontSize: 12,
//     lineHeight: 19,
//   },
//   completeButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 9,
//     backgroundColor: TEAL,
//     borderRadius: 15,
//     padding: 16,
//     marginTop: 20,
//   },
//   completedButton: {
//     backgroundColor: TEAL_DARK,
//   },
//   completeButtonText: {
//     color: WHITE,
//     fontWeight: "800",
//     fontSize: 13,
//   },
//   noteText: {
//     color: MUTED,
//     fontSize: 11,
//     lineHeight: 17,
//     textAlign: "center",
//     marginTop: 15,
//   },
// });