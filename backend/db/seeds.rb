vocabulary = Vocabulary.create!(user: User.first, vocabulary_en: 'car', meaning_ja: '車')
VocabularyDetail.create!(vocabulary_id: vocabulary.id, comprehension_rate: 0, memo: 'テスト')
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "a motor vehicle with four wheels; usually propelled by an internal combustion engine",
  example: "he needs a car to get to work"
)
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant",
  example: "the car was on the top floor"
)
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "a wheeled vehicle adapted to the rails of railroad",
  example: "three cars had jumped the rails"
)
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "a conveyance for passengers or freight on a cable railway",
  example: "they took a cable car to the top of the mountain"
)
