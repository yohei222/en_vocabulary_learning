# frozen_string_literal: true

class VocabularyFactory
  def initialize(user)
    @user = user
  end

  attr_reader :user, :params

  CREATE_VOCABULARY_PARAMS_KEYS = ["vocabulary_en", "meaning_ja"]

  def build_with_detail_and_usages(create_params)
    vocabulary = @user.vocabularies.build(create_vocabulary_params(create_params))
    vocabulary.build_vocabulary_detail(create_vocabulary_detail_params(create_params))

    fetched_vocabulary_usages = ::WordsApi.fetch(create_params["vocabulary_en"])
    vocabulary.vocabulary_usages.build(fetched_vocabulary_usages)

    vocabulary
  end

  private

  def create_vocabulary_params(create_params)
    create_params.select{ |k| CREATE_VOCABULARY_PARAMS_KEYS.include?(k) }
  end

  def create_vocabulary_detail_params(create_params)
    create_params["vocabulary_detail"]
  end
end
