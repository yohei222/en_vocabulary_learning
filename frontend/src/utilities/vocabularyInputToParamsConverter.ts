import { VocabularyCreateInput, VocabularyCreateParams } from "type";

const vocabularyInputToParamsConverter = (
  data: VocabularyCreateInput
): VocabularyCreateParams => {
  return {
    vocabularyEn: data.vocabularyEn,
    meaningJa: data.meaningJa,
    vocabularyDetail: {
      comprehensionRate: data.comprehensionRate,
      memo: data.memo,
    },
  };
};

export default vocabularyInputToParamsConverter;
