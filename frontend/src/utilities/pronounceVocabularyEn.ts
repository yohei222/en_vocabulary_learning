const pronounceVocabularyEn = (vocabularyEn: string) => {
  const audio = new SpeechSynthesisUtterance();
  audio.lang = "en-US";
  audio.text = vocabularyEn;
  speechSynthesis.speak(audio);
}

export default pronounceVocabularyEn;
