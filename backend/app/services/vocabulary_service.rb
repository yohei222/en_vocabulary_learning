# frozen_string_literal: true

class VocabularyService
  class << self
    def create!(user, create_params)
      factory = ::VocabularyFactory.new(user)
      vocabulary = factory.build_with_detail_and_usages(create_params)

      ActiveRecord::Base.transaction do
        vocabulary.save!

        vocabulary
      end
    end
  end
end
