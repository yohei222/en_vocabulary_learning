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
  example: string;
  createdAt: Date;
  updatedAt: Date;
};
