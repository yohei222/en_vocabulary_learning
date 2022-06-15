// todo paramsとmodelのtypeで別ファイルに分ける？

export type SignUpParams = {
  nickname: string;
  email: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type VocabularyCreateParams = {
  vocabularyEn: string;
  meaningJa: string;
  vocabularyDetail: {
    comprehensionRate: string;
    memo: string;
  };
};

export type VocabularyCreateInput = {
  vocabularyEn: string;
  meaningJa: string;
  comprehensionRate: string;
  memo: string;
};

export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Vocabulary = {
  id: number;
  userId: string;
  vocabularyEn: string;
  meaningJa: string;
  vocabularyDetail: VocabularyDetail;
  vocabularyUsages: VocabularyUsage[];
  createdAt: Date;
  updatedAt: Date;
};

export type VocabularyDetail = {
  id: number;
  vocabularyId: string;
  comprehensionRate: string;
  memo: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VocabularyUsage = {
  id: number;
  vocabularyId: string;
  definition: string;
  examples: string;
  createdAt: Date;
  updatedAt: Date;
};
