class VocabularyDetailSerializer < ActiveModel::Serializer
  attributes :id, :vocabulary_id, :comprehension_rate, :memo
end
