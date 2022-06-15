User.create!(nickname: "nickname", password: "password", email: "test@example.com")

vocabulary = Vocabulary.create!(user: User.first, vocabulary_en: 'car', meaning_ja: '車')
VocabularyDetail.create!(vocabulary_id: vocabulary.id, comprehension_rate: 0, memo: 'テスト')
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "a motor vehicle with four wheels; usually propelled by an internal combustion engine",
  examples: "he needs a car to get to work, second example"
)
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "the compartment that is suspended from an airship and that carries personnel and the cargo and the power plant",
  examples: "the car was on the top floor, second example, third example"
)
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "a wheeled vehicle adapted to the rails of railroad",
  examples: "three cars had jumped the rails, second example, third example"
)
VocabularyUsage.create!(
  vocabulary_id: vocabulary.id,
  definition: "a conveyance for passengers or freight on a cable railway",
  examples: "they took a cable car to the top of the mountain"
)

vocabulary2 = Vocabulary.create!(user: User.first, vocabulary_en: 'laptop', meaning_ja: 'パソコン')
VocabularyDetail.create!(vocabulary_id: vocabulary2.id, comprehension_rate: 0, memo: 'テスト2')
VocabularyUsage.create!(
  vocabulary_id: vocabulary2.id,
  definition: "laptop",
  examples: "makes you smart"
)
