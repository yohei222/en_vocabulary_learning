import { getRequest } from 'lib/api/client';
import { createContext, useEffect, useState } from 'react';
import { Vocabulary } from 'type';
import API_PATH from 'path/API_PATH';
import { GridSelectionModel } from '@mui/x-data-grid';

type ContextType = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void;
  vocabularyList: Vocabulary[],
  setVocabularyList: (vocabularyList: Vocabulary[]) => void;
  params: any;
  setParams: (params: any) => void;
  checkedRecordIds: GridSelectionModel;
  setCheckedRecordIds: (checkedRecordIds: GridSelectionModel) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isCreateModalOpen: boolean) => void;
  selectedRecord: Vocabulary | undefined;
  setSelectedRecord: (selectedRecord: Vocabulary | undefined) => void;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (isCreateModalOpen: boolean) => void;
  renewRecords: () => void;
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
  isCreateModalOpen: false,
  setIsCreateModalOpen: () => null,
  isUpdateModalOpen: false,
  setIsUpdateModalOpen: () => null,
  selectedRecord: undefined,
  setSelectedRecord: () => null,
  renewRecords: () => null,
};

export const VocabularyContext = createContext<ContextType>(defaultContext);

export const useVocabularyContext = (): ContextType => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vocabularyList, setVocabularyList] = useState<Vocabulary[]>([]);
  const [params, setParams] = useState<any>({});
  const [checkedRecordIds, setCheckedRecordIds] = useState<GridSelectionModel>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Vocabulary | undefined>(undefined);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const renewRecords = async () => {
    setIsLoading(true);
    const { responseData, status } = await getRequest(API_PATH.VOCABULARIES.INDEX, params);

    if (status === 200) setVocabularyList(responseData);
    setIsLoading(false);
  }

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
    setCheckedRecordIds,
    isCreateModalOpen,
    setIsCreateModalOpen,
    selectedRecord,
    setSelectedRecord,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    renewRecords
  };
}
