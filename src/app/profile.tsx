import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const PROFILE_KEY = "tragoProfile";

type ProfileData = {
  name: string;
  email: string;
  language: string;
  level: string;
  goal: string;
  photo: string | null;
  notifications: boolean;
};

const defaultProfile: ProfileData = {
  name: "Alex",
  email: "",
  language: "Korean",
  level: "A1 Beginner",
  goal: "15 minutes",
  photo: null,
  notifications: true,
};

const languages = [
  "Korean",
  "Japanese",
  "Spanish",
  "French",
  "German",
  "Chinese",
];

const levels = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

const goals = ["5 minutes", "15 minutes", "30 minutes", "60 minutes"];

export default function ProfileScreen() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const saved = await AsyncStorage.getItem(PROFILE_KEY);

        // Also import details saved by the earlier dashboard login.
        const oldName = await AsyncStorage.getItem("userName");
        const oldEmail = await AsyncStorage.getItem("userEmail");
        const oldAvatar = await AsyncStorage.getItem("userAvatar");

        if (saved) {
          setProfile({
            ...defaultProfile,
            ...JSON.parse(saved),
          });
        } else {
          setProfile({
            ...defaultProfile,
            name: oldName || defaultProfile.name,
            email: oldEmail || defaultProfile.email,
            photo: null,
          });
        }

        // Use the older avatar initial only when there is no saved name.
        if (!saved && !oldName && oldAvatar) {
          setProfile((previous) => ({
            ...previous,
            name: oldAvatar,
          }));
        }
      } catch {
        Alert.alert("Notice", "Could not load your saved profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function updateField<K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) {
    setProfile((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function choosePhoto() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Photo permission",
          "Allow photo library access to choose a profile picture.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        updateField("photo", result.assets[0].uri);
      }
    } catch {
      Alert.alert("Error", "Could not open your photo library.");
    }
  }

  async function saveProfile() {
    if (!profile.name.trim()) {
      Alert.alert("Name required", "Please enter your name.");
      return;
    }

    try {
      const cleanedProfile = {
        ...profile,
        name: profile.name.trim(),
        email: profile.email.trim(),
      };

      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(cleanedProfile));

      // Keep the dashboard profile in sync with the profile screen.
      await AsyncStorage.setItem("userName", cleanedProfile.name);
      await AsyncStorage.setItem("userEmail", cleanedProfile.email);
      await AsyncStorage.setItem(
        "userAvatar",
        cleanedProfile.name.charAt(0).toUpperCase(),
      );

      setProfile(cleanedProfile);
      setEditing(false);

      Alert.alert("Success", "Your profile has been updated! ✨");
    } catch {
      Alert.alert("Error", "Your profile could not be saved.");
    }
  }

  function changeLanguage() {
    Alert.alert(
      "Choose a language",
      "Select your preferred learning language.",
      [
        ...languages.map((language) => ({
          text: language,
          onPress: () => updateField("language", language),
        })),
        { text: "Cancel", style: "cancel" },
      ] as Array<{
        text: string;
        onPress?: () => void;
        style?: "default" | "cancel" | "destructive";
      }>,
    );
  }

  function changeLevel() {
    Alert.alert("Choose your level", "Select your current language level.", [
      ...levels.map((level) => ({
        text: level,
        onPress: () => updateField("level", level),
      })),
      { text: "Cancel", style: "cancel" },
    ] as Array<{
      text: string;
      onPress?: () => void;
      style?: "default" | "cancel" | "destructive";
    }>);
  }

  function changeGoal() {
    Alert.alert(
      "Daily learning goal",
      "How long would you like to study each day?",
      [
        ...goals.map((goal) => ({
          text: goal,
          onPress: () => updateField("goal", goal),
        })),
        { text: "Cancel", style: "cancel" },
      ] as Array<{
        text: string;
        onPress?: () => void;
        style?: "default" | "cancel" | "destructive";
      }>,
    );
  }

  function changePassword() {
    Alert.alert(
      "Change password",
      "Password changing will be available when account authentication is connected.",
    );
  }

  function logout() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          // Remove session information, not the saved profile.
          await AsyncStorage.removeItem("userEmail");
          await AsyncStorage.removeItem("userName");
          await AsyncStorage.removeItem("userAvatar");

          router.replace("/");
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  const initial = profile.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <LinearGradient
      colors={["#FFF3F8", "#F6EDFF", "#FFEAF3"]}
      locations={[0, 0.55, 1]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.page}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityLabel="Go back"
            >
              <Text style={styles.backText}>‹</Text>
            </Pressable>

            <Text style={styles.headerTitle}>My Profile</Text>

            <View style={styles.headerSpace} />
          </View>

          {/* Profile card */}
          <View style={styles.profileCard}>
            <Pressable
              onPress={choosePhoto}
              style={styles.photoContainer}
              accessibilityLabel="Change profile photo"
            >
              {profile.photo ? (
                <Image source={{ uri: profile.photo }} style={styles.photo} />
              ) : (
                <LinearGradient
                  colors={["#F4A8CA", "#C9A5EF"]}
                  style={styles.photo}
                >
                  <Text style={styles.photoInitial}>{initial}</Text>
                </LinearGradient>
              )}

              <View style={styles.cameraButton}>
                <Text style={styles.cameraText}>✎</Text>
              </View>
            </Pressable>

            <Text style={styles.profileName}>
              {profile.name || "Your name"}
            </Text>

            <Text style={styles.profileEmail}>
              {profile.email || "Add your email address"}
            </Text>

            <View style={styles.languageBadge}>
              <Text style={styles.languageBadgeText}>
                🌸 Learning {profile.language}
              </Text>
            </View>

            <Pressable
              style={styles.editButton}
              onPress={() => setEditing(!editing)}
            >
              <Text style={styles.editButtonText}>
                {editing ? "Cancel editing" : "✎  Edit profile"}
              </Text>
            </Pressable>
          </View>

          {/* Personal information */}
          <Text style={styles.sectionTitle}>Personal information</Text>

          <View style={styles.settingCard}>
            <Text style={styles.settingIcon}>👤</Text>
            <View style={styles.settingContent}>
              <Text style={styles.fieldLabel}>Full name</Text>
              <TextInput
                value={profile.name}
                onChangeText={(value) => updateField("name", value)}
                editable={editing}
                placeholder="Enter your name"
                placeholderTextColor="#B7A5B9"
                style={[styles.input, !editing && styles.readOnlyInput]}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <Text style={styles.settingIcon}>✉️</Text>
            <View style={styles.settingContent}>
              <Text style={styles.fieldLabel}>Email address</Text>
              <TextInput
                value={profile.email}
                onChangeText={(value) => updateField("email", value)}
                editable={editing}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#B7A5B9"
                style={[styles.input, !editing && styles.readOnlyInput]}
              />
            </View>
          </View>

          {/* Learning preferences */}
          <Text style={styles.sectionTitle}>Learning preferences</Text>

          <SettingRow
            icon="🌍"
            label="Learning language"
            value={profile.language}
            onPress={changeLanguage}
            editable={editing}
          />

          <SettingRow
            icon="🎯"
            label="Current level"
            value={profile.level}
            onPress={changeLevel}
            editable={editing}
          />

          <SettingRow
            icon="⏰"
            label="Daily learning goal"
            value={profile.goal}
            onPress={changeGoal}
            editable={editing}
          />

          {/* Notifications */}
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingCard}>
            <Text style={styles.settingIcon}>🔔</Text>
            <View style={styles.settingContent}>
              <Text style={styles.rowTitle}>Learning reminders</Text>
              <Text style={styles.rowDescription}>
                Get reminders to practise every day.
              </Text>
            </View>

            <Switch
              value={profile.notifications}
              onValueChange={(value) => updateField("notifications", value)}
              trackColor={{ false: "#DDD3DF", true: "#E58AB8" }}
              thumbColor={profile.notifications ? "#FFFFFF" : "#F5F0F5"}
            />
          </View>

          {/* Account actions */}
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.actionCard}>
            <ActionRow title="🔐  Change password" onPress={changePassword} />
            <ActionRow
              title="🌐  Change learning language"
              onPress={changeLanguage}
            />
            <ActionRow title="🚪  Log out" onPress={logout} danger last />
          </View>

          {editing && (
            <Pressable style={styles.saveButton} onPress={saveProfile}>
              <LinearGradient
                colors={["#E85D9E", "#A66EE8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveGradient}
              >
                <Text style={styles.saveButtonText}>Save profile ✨</Text>
              </LinearGradient>
            </Pressable>
          )}

          <Text style={styles.footer}>Made with 🌸 by Trago</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

function SettingRow({
  icon,
  label,
  value,
  onPress,
  editable,
}: {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
  editable: boolean;
}) {
  return (
    <Pressable
      style={styles.settingCard}
      onPress={onPress}
      disabled={!editable}
    >
      <Text style={styles.settingIcon}>{icon}</Text>
      <View style={styles.settingContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.rowTitle}>{value}</Text>
      </View>
      {editable && <Text style={styles.chevron}>›</Text>}
    </Pressable>
  );
}

function ActionRow({
  title,
  onPress,
  danger = false,
  last = false,
}: {
  title: string;
  onPress: () => void;
  danger?: boolean;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.actionRow, !last && styles.actionBorder]}
    >
      <Text style={[styles.actionText, danger && styles.dangerText]}>
        {title}
      </Text>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1 },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3F8",
  },
  loadingText: {
    color: "#9C4C91",
    fontSize: 15,
    fontWeight: "600",
  },
  page: {
    width: "100%",
    maxWidth: 850,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  backButton: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  backText: {
    fontSize: 34,
    lineHeight: 38,
    color: "#9C4C91",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#38233F",
  },
  headerSpace: { width: 45 },
  profileCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 28,
    padding: 30,
    marginBottom: 28,
    elevation: 4,
  },
  photoContainer: {
    width: 110,
    height: 110,
    marginBottom: 15,
    position: "relative",
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  photoInitial: {
    fontSize: 43,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#D95F9D",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraText: { color: "#FFFFFF", fontSize: 17 },
  profileName: {
    color: "#38233F",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
  },
  profileEmail: {
    color: "#8A718D",
    fontSize: 13,
    marginBottom: 14,
  },
  languageBadge: {
    backgroundColor: "#FFF0F7",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginBottom: 17,
  },
  languageBadgeText: {
    color: "#B34D89",
    fontSize: 12,
    fontWeight: "700",
  },
  editButton: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#F9E1EE",
  },
  editButtonText: {
    color: "#B34D89",
    fontSize: 13,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#4A2B4F",
    marginBottom: 12,
    marginTop: 2,
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 11,
    elevation: 2,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#F9E8F2",
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    fontSize: 20,
  },
  settingContent: { flex: 1, minWidth: 0 },
  fieldLabel: {
    fontSize: 12,
    color: "#8B718E",
    marginBottom: 5,
  },
  input: {
    color: "#38233F",
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 2,
  },
  readOnlyInput: { opacity: 1 },
  rowTitle: {
    color: "#38233F",
    fontSize: 14,
    fontWeight: "700",
  },
  rowDescription: {
    color: "#9A869C",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },
  chevron: {
    fontSize: 25,
    color: "#B69AB7",
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    elevation: 2,
  },
  actionRow: {
    minHeight: 57,
    paddingHorizontal: 17,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3E7F0",
  },
  actionText: {
    color: "#4B304F",
    fontSize: 14,
    fontWeight: "500",
  },
  dangerText: { color: "#C94F75" },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 4,
    elevation: 4,
  },
  saveGradient: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  footer: {
    textAlign: "center",
    color: "#A28CA5",
    fontSize: 12,
    marginTop: 25,
  },
});
