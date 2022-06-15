module VocabularyUsages
  class DeleteSpecification

    def initialize(vocabulary)
      @vocabulary = vocabulary
    end

    def satisfied_by?(vocabulary_en_param)
      @vocabulary.vocabulary_en != vocabulary_en_param
    end
  end
end
