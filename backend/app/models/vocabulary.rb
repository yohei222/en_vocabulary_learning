# frozen_string_literal: true

class Vocabulary < ApplicationRecord
  has_one :vocabulary_detail, dependent: :destroy
  has_many :vocabulary_usages, dependent: :destroy
  belongs_to :user

  VOCABULARY_PARAMS_KEYS = ["vocabulary_en", "meaning_ja"]

  def self.vocabulary_params(params)
    params.select{ |k| VOCABULARY_PARAMS_KEYS.include?(k) }
  end
end
