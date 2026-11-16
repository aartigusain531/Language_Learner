type LanguageContent = {
    greeting: string;
    meaning: string;
    words: {
      word: string;
      translation: string;
    }[];
  };
  
  const Korean: LanguageContent = {
    greeting: "안녕하세요",
    meaning: "Hello",
    words: [
      { word: "감사합니다", translation: "Thank you" },
      { word: "네", translation: "Yes" },
      { word: "아니요", translation: "No" },
    ],
  };
  
  export default Korean;