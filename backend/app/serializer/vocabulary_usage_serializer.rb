class VocabularyUsageSerializer < ActiveModel::Serializer
  attributes :id, :vocabulary_id, :definition, :examples
end
