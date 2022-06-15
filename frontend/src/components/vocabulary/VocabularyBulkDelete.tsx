// このファイルを実装するところから！
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react'
import { Button, Container, TextField } from '@mui/material';
import { VocabularyContext } from 'contexts/VocabularyContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { VocabularyCreateParams, VocabularyCreateInput } from "type";
import * as yup from "yup";
import Color from 'Color';
import { jaTranslate } from "locales/i18n";
import { deleteRequest } from 'lib/api/client';
import API_PATH from "path/API_PATH";
import { toast } from 'react-toastify';
import Loading from "components/Loading";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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
      height: '20%',
      padding: '20px 40px',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      backgroundColor: 'white',
      boxShadow: '24',
      p: 4,
      overflowY: 'scroll'
    },
    button: {
      width: '40%',
      marginLeft: 'auto',
      marginRight: 'auto,'
    }
  })
);

const VocabularyBulkDelete = ():JSX.Element => {
  const classes = useStyles();
  const {
    vocabularyList,
    setVocabularyList,
    params,
    setParams,
    isCreateModalOpen,
    setIsCreateModalOpen,
    setIsVocabularyListChanged,
    checkedRecordIds,
    setCheckedRecordIds
  } = useContext(VocabularyContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  // todo 修正する
  const notifySignUpSuccess = () => toast(jaTranslate('success.action', 'actions.signUp'));
  const notifySignUpFailure = () => toast(jaTranslate('failure.action', 'actions.signUp'));

  // useMemoに変更する
  const checkedRecordIdsCount = checkedRecordIds.length;

  const handleBulkDeleteClick = async () => {
    debugger;
    const { status } = await deleteRequest("bulk/vocabularies", { ids: checkedRecordIds });

    debugger;
    if (status === 200) {
      setIsVocabularyListChanged(true)
      setIsConfirmModalOpen(false)
      notifySignUpSuccess();
    } else {
      notifySignUpFailure();
    }
  }

  return (
    <>
      {(checkedRecordIdsCount >= 1) && (
        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={() => setIsConfirmModalOpen(true)}>
          一括削除
        </Button>
      )}

      {(isConfirmModalOpen) && (
        <Modal
          open={isConfirmModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <Box className={classes.modal}>
            本当に削除してもよろしいですか？
            (削除件数：{checkedRecordIdsCount}件)
            <Button
              variant="contained"
              color="warning"
              size="large"
              className={classes.button}
              onClick={() => handleBulkDeleteClick()}>
              削除する
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              className={classes.button}
              onClick={() => setIsConfirmModalOpen(false)}>
              閉じる
            </Button>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default VocabularyBulkDelete
