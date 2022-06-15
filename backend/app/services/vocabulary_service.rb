# frozen_string_literal: true

class VocabularyService
  class << self
    def create!(user, create_params)
      factory = ::VocabularyFactory.new
      vocabulary = factory.build(user, create_params)
      vocabulary.save!
    end

    def update!(vocabulary, update_params, is_vocabulary_en_changed)
      factory = ::VocabularyFactory.new
      vocabulary = factory.assign_attributes(vocabulary, update_params, is_vocabulary_en_changed)

      ActiveRecord::Base.transaction do
        vocabulary.save!
        vocabulary.vocabulary_detail.save!
      end
    end

    def bulk_delete!(vocabularies)
      ActiveRecord::Base.transaction do
        vocabularies.map(&:destroy!)
      end
    end
  end
end
