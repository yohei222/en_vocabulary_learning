# frozen_string_literal: true

class Vocabulary < ApplicationRecord
  has_one :vocabulary_detail, dependent: :destroy
  has_many :vocabulary_usages, dependent: :destroy
  belongs_to :user
end
