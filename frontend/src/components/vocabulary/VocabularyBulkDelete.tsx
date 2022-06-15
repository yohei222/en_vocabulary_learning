import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { VocabularyContext } from 'contexts/VocabularyContext';
import { deleteRequest } from 'lib/api/client';
import { jaTranslate } from "locales/i18n";
import React, { useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 500,
      marginTop: '20px'
    },
    modal: {
      position: 'absolute' as 'absolute',
      top: '30%',
      left: '50%',
      height: '200px',
      padding: '20px 40px',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      backgroundColor: 'white',
      boxShadow: '24',
      p: 4,
      overflowY: 'scroll'
    },
    button: {
      marginRight: '10px'
    },
    modalButton: {
      marginRight: '10px'
    },
    bold: {
      fontWeight: 'bold',
      marginBottom: '10px'
    }
  })
);

const VocabularyBulkDelete = ():JSX.Element => {
  const classes = useStyles();
  const {
    setIsCreateModalOpen,
    setIsVocabularyListChanged,
    checkedRecordIds,
  } = useContext(VocabularyContext);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const notifyBulkDeleteSuccess = () => toast(jaTranslate('success.bulkDelete', 'model.vocabulary.modelName'));
  const notifyBulkDeleteFailure = () => toast(jaTranslate('failure.bulkDelete', 'model.vocabulary.modelName'));

  const checkedRecordIdsCount = useMemo(() =>
    checkedRecordIds.length
  , [checkedRecordIds])

  const handleBulkDeleteClick = async () => {
    const { status } = await deleteRequest("bulk/vocabularies", { ids: checkedRecordIds });

    if (status === 200) {
      setIsVocabularyListChanged(true)
      setIsConfirmModalOpen(false)
      notifyBulkDeleteSuccess();
    } else {
      notifyBulkDeleteFailure();
    }
  }

  return (
    <>
      {(checkedRecordIdsCount >= 1) && (
        <span className={classes.button}>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={() => setIsConfirmModalOpen(true)}>
            一括削除
          </Button>
        </span>
      )}

      {(isConfirmModalOpen) && (
        <Modal
          open={isConfirmModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <Box className={classes.modal}>
            <p>{jaTranslate('actions.confirm.delete')}</p>
            <p>削除件数：<span className={classes.bold}>{checkedRecordIdsCount}件</span></p>
            <span className={classes.modalButton}>
              <Button
                variant="contained"
                color="warning"
                size="large"
                onClick={() => handleBulkDeleteClick()}>
                削除する
              </Button>
            </span>
            <span className={classes.modalButton}>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => setIsConfirmModalOpen(false)}>
                閉じる
              </Button>
            </span>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default VocabularyBulkDelete
