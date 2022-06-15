# frozen_string_literal: true

class VocabularyFactory
  def build(user, create_params)
    vocabulary = user.vocabularies.build(::Vocabulary.vocabulary_params(create_params))
    vocabulary.build_vocabulary_detail(vocabulary_detail_params(create_params))

    fetched_vocabulary_usages = ::WordsApi.fetch(vocabulary_en_param(create_params))
    vocabulary.vocabulary_usages.build(fetched_vocabulary_usages)

    vocabulary
  end

  def assign_attributes(vocabulary, update_params, is_vocabulary_en_changed)
    vocabulary.assign_attributes(::Vocabulary.vocabulary_params(update_params))
    vocabulary.vocabulary_detail.assign_attributes(vocabulary_detail_params(update_params))

    if is_vocabulary_en_changed
      fetched_vocabulary_usages = ::WordsApi.fetch(vocabulary_en_param(update_params))
      vocabulary.vocabulary_usages.build(fetched_vocabulary_usages)
    end

    vocabulary
  end

  private

  def vocabulary_detail_params(params)
    params["vocabulary_detail"]
  end

  def vocabulary_en_param(params)
    params["vocabulary_en"]
  end
end
