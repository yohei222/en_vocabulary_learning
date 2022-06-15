import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { VocabularyContext } from 'contexts/VocabularyContext';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { jaTranslate } from "locales/i18n";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 500,
      marginTop: '20px'
    },
  })
);

const VocabularySearchField = (): JSX.Element => {
  const classes = useStyles();
  const { setParams } = useContext(VocabularyContext);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  useEffect(() => {
    setParams({searchText: searchText})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  return (
    <Box
      sx={{
        maxWidth: '80%',
        mt: 3
      }}
    >
      <TextField
        fullWidth
        label="検索"
        id="fullWidth"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Box>
  )
}

export default VocabularySearchField
