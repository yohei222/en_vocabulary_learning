# frozen_string_literal: true

class VocabularyDetail < ApplicationRecord
  belongs_to :vocabulary

  enum comprehension_rate: { high: 0, middle: 1, low: 2  }
end
