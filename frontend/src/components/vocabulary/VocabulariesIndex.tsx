import React from 'react'
import { VocabularyContext, useVocabularyContext } from 'contexts/VocabularyContext';
import VocabularyListTable from './VocabularyListTable';
import VocabularyCreate from './VocabularyCreate';
import VocabularyBulkDelete from './VocabularyBulkDelete';
import VocabularySearchField from './VocabularySearchField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '88%',
      padding: '10px 20px',
      margin: '0 auto',
      marginTop: '20px',
      // backgroundColor: ''
    },
  })
);

const VocabulariesIndex = (): JSX.Element => {
  const ctx = useVocabularyContext();
  const classes = useStyles();

  return (
    <VocabularyContext.Provider value={ctx}>
      <div className={classes.root}>
        {/* todo search formの実装 */}
        <VocabularySearchField />
        {/* todo apiの実装→create button→modalの実装 */}
        {/* 続けて登録するボタンも実装する */}
        <VocabularyBulkDelete />
        <VocabularyCreate />
        <VocabularyListTable />
      </div>
    </VocabularyContext.Provider>
  )
}

export default VocabulariesIndex;
