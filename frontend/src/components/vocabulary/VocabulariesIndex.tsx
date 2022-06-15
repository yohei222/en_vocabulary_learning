import React from 'react'
import { VocabularyContext, useVocabularyContext } from 'contexts/VocabularyContext';
import VocabularyListTable from './VocabularyListTable';
import VocabularyCreate from './VocabularyCreate';
import VocabularyUpdate from './VocabularyUpdate';
import VocabularyBulkDelete from './VocabularyBulkDelete';
import VocabularySearchField from './VocabularySearchField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { jaTranslate } from "locales/i18n";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '88%',
      padding: '10px 20px',
      margin: '0 auto',
      marginTop: '20px',
    },
  })
);

const VocabulariesIndex = (): JSX.Element => {
  const ctx = useVocabularyContext();
  const classes = useStyles();

  return (
    <VocabularyContext.Provider value={ctx}>
      <div className={classes.root}>
        <h1>{jaTranslate('appName')}</h1>
        <VocabularySearchField />
        {/* todo デプロイする */}
        {/* todo 英単語の音声確認をする機能を追加 */}
        {/* todo リファクタリング(jaTranslateにする, useMemoに変更する、など) */}
        <VocabularyBulkDelete />
        <VocabularyCreate />
        <VocabularyUpdate />
        <VocabularyListTable />
      </div>
    </VocabularyContext.Provider>
  )
}

export default VocabulariesIndex;
