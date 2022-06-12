import { getRequest } from 'lib/api/client';
import { createContext, useEffect, useState } from 'react';
import { Vocabulary } from 'type';
import API_PATH from 'path/API_PATH';

type ContextType = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void;
  vocabularyList: Vocabulary[],
  setVocabularyList: (vocabularyList: Vocabulary[]) => void;
  params: any;
  setParams: (params: any) => void;
  checkedRecordIds: number[];
  setCheckedRecordIds: (checkedRecordIds: number[]) => void;
}

const defaultContext: ContextType = {
  isLoading: false,
  setIsLoading: () => null,
  vocabularyList: [],
  setVocabularyList: () => null,
  params: {},
  setParams: () => null,
  checkedRecordIds: [],
  setCheckedRecordIds: () => null,
};

export const VocabularyContext = createContext<ContextType>(defaultContext);

export const useVocabularyContext = (): ContextType => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vocabularyList, setVocabularyList] = useState<Vocabulary[]>([]);
  const [params, setParams] = useState<any>({});
  const [checkedRecordIds, setCheckedRecordIds] = useState<number[]>([]);

  useEffect(() => {
    const asyncFetchVocabularyList = async () => {
      setIsLoading(true);
      const { responseData, status } = await getRequest(API_PATH.VOCABULARIES.INDEX, params);

      if (status === 200) setVocabularyList(responseData);
      setIsLoading(false);
    }
    asyncFetchVocabularyList()
  }, [params])

  return {
    isLoading,
    setIsLoading,
    vocabularyList,
    setVocabularyList,
    params,
    setParams,
    checkedRecordIds,
    setCheckedRecordIds
  };
}
