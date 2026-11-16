type LanguageContent = {
  greeting: string;
  meaning: string;
  words: {
    word: string;
    translation: string;
  }[];
};

const Japanese: LanguageContent = {
  greeting: "こんにちは",
  meaning: "Hello / Good afternoon",
  words: [
    { word: "ありがとう", translation: "Thank you" },
    { word: "はい", translation: "Yes" },
    { word: "いいえ", translation: "No" },
  ],
};

export default Japanese;