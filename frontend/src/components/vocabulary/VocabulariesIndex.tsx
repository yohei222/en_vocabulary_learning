import React from 'react'
import { VocabularyContext, useVocabularyContext } from 'contexts/VocabularyContext';
import VocabularyListTable from './VocabularyListTable';
import VocabularyAddButton from './VocabularyAddButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '90%',
      margin: '0 auto',
      marginTop: '20px'
    },
  })
);

const VocabulariesIndex = (): JSX.Element => {
  const ctx = useVocabularyContext();
  const classes = useStyles();

  return (
    <VocabularyContext.Provider value={ctx}>
      <div className={classes.root}>
        <VocabularyAddButton />
        <VocabularyListTable />
      </div>
    </VocabularyContext.Provider>
  )
}

export default VocabulariesIndex;
