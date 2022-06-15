import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { VocabularyContext } from 'contexts/VocabularyContext';
import React, { useContext, useEffect, useState } from 'react';

const VocabularySearchField = (): JSX.Element => {
  const { setParams } = useContext(VocabularyContext);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  useEffect(() => {
    setParams({searchText: searchText})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  return (
    <Box
      sx={{
        maxWidth: '100%',
        mt: 3,
        mb: 3
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
