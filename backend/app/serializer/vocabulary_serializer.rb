class VocabularySerializer < ActiveModel::Serializer
  attributes :id, :vocabulary_en, :meaning_ja, :created_at, :updated_at, :usage_count
  has_one :vocabulary_detail,  serializer: VocabularyDetailSerializer
  has_many :vocabulary_usages,  serializer: VocabularyUsageSerializer

  def usage_count
    object.vocabulary_usages.size
  end
end
