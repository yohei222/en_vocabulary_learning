# frozen_string_literal: true

class VocabularyUsageService
  class << self
    def bulk_delete!(vocabulary)
      usages = vocabulary.vocabulary_usages

      ActiveRecord::Base.transaction do
        usages.map{ |usage| usage.destroy! }
      end
    end
  end
end
