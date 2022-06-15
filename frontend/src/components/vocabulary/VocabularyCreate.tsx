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
import { postRequest } from 'lib/api/client';
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
      top: '40%',
      left: '50%',
      height: '70%',
      padding: '20px 40px',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      backgroundColor: 'white',
      boxShadow: '24',
      p: 4,
      overflowY: 'scroll'
    },
    formWrapper: {
      marginBottom: '10px',
    },
    form: {
      paddingTop: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
    button: {
      width: '100%',
    },
    errorMessage: {
      color: Color.red,
      marginLeft: '5px',
      fontWeight: 'bolder',
    },
    attachMemoButton: {
      marginButton: '20px'
    }
  })
);

// todo 書き直す
const schema = yup.object({
  vocabularyEn: yup.string().min(2).required(
    // jaTranslate('errors.required', 'model.user.nickname')
    "ほげ"
  ),
  meaningJa: yup.string().min(1).required(
    // jaTranslate('errors.required', 'model.user.email')
    "ほげ"
  ),
  comprehensionRate: yup.string().required(
    // jaTranslate('errors.required', 'model.user.email')
    "ほげ"
  )
}).required();

const VocabularyCreate = (): JSX.Element => {
  const classes = useStyles();
  const [isAttachMemo, setIsAttachMemo] = useState<boolean>(false);
  const [comprehensionValueLabel, setComprehensionValueLabel] = useState<string | undefined>(undefined)
  // todo 以下二つ、書き換える
  const notifySignUpSuccess = () => toast(jaTranslate('success.action', 'actions.signUp'));
  const notifySignUpFailure = () => toast(jaTranslate('failure.action', 'actions.signUp'));

  const {
    vocabularyList,
    setVocabularyList,
    params,
    setParams,
    checkedRecordIds,
    setCheckedRecordIds,
    isCreateModalOpen,
    setIsCreateModalOpen,
    setIsVocabularyListChanged
  } = useContext(VocabularyContext);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<VocabularyCreateInput>({
    resolver: yupResolver(schema)
  });

  const inputToParamsConverter = (data: VocabularyCreateInput): VocabularyCreateParams => {
    return {
      vocabularyEn: data.vocabularyEn,
      meaningJa: data.meaningJa,
      vocabularyDetail: {
        comprehensionRate: data.comprehensionRate,
        memo: data.memo
      }
    }
  }

  const onSubmit: SubmitHandler<VocabularyCreateInput> = async (data: VocabularyCreateInput) => {
    const body: VocabularyCreateParams = inputToParamsConverter(data)
    debugger;

    const { status } = await postRequest(
      API_PATH.VOCABULARIES.CREATE, body
    );

    if (status === 200) {
      setIsVocabularyListChanged(true)
      setIsCreateModalOpen(false);
      notifySignUpSuccess();
    } else {
      notifySignUpFailure();
    }
  };

  // todo バックエンドに不要なparamsが送られるのを修正するところから
  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => setIsCreateModalOpen(true)}>
        新規作成
      </Button>

      {(isCreateModalOpen) && (
        <Modal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <Box className={classes.modal}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
              <div className={classes.form}>
                <TextField
                  fullWidth
                  label="vocabulary"
                  className={classes.form}
                  {...register("vocabularyEn", { required: true, minLength: 1, maxLength: 50 })}
                />
                {errors.vocabularyEn && (
                  <span className={classes.errorMessage} color="danger">
                    * {errors.vocabularyEn.message}
                  </span>
                )}
              </div>

              <div className={classes.form}>
                <TextField
                  fullWidth
                  label="意味"
                  className={classes.form}
                  {...register("meaningJa", { required: true, minLength: 1, maxLength: 30 })}
                />
                {errors.meaningJa && (
                  <span className={classes.errorMessage} color="danger">
                    * {errors.meaningJa.message}
                  </span>
                )}
              </div>

              <div className={classes.form}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">理解度</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={comprehensionValueLabel}
                    label="理解度"
                    {...register("comprehensionRate")}
                    onChange={(e) =>
                      setComprehensionValueLabel(e.target.value)
                    }
                  >
                    <MenuItem value={"high"}>高い</MenuItem>
                    <MenuItem value={"middle"}>まあまあ</MenuItem>
                    <MenuItem value={"low"}>要復習</MenuItem>
                  </Select>
                </FormControl>
                {errors.comprehensionRate && (
                  <span className={classes.errorMessage} color="danger">
                    * {errors.comprehensionRate.message}
                  </span>
                )}
              </div>

              {(!isAttachMemo) && (
                <div className={classes.form}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.attachMemoButton}
                    onClick={() => {
                      setIsAttachMemo(true)
                    }}
                  >
                    メモを追加
                  </Button>
                </div>
              )}

              {(isAttachMemo) && (
                <>
                  <div className={classes.form}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.attachMemoButton}
                      onClick={() => {
                        setIsAttachMemo(false)
                        setValue('memo', '')
                      }}
                    >
                      メモを取り消す
                    </Button>
                  </div>
                  <div className={classes.form}>
                    <TextField
                      multiline
                      fullWidth
                      rows={2}
                      label="メモ"
                      className={classes.form}
                      {...register("memo")}
                    />
                    {errors.memo && (
                      <span className={classes.errorMessage} color="danger">
                        * {errors.memo.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              <Button
                variant="contained"
                color="success"
                size="large"
                className={classes.button}
                type="submit">
                {jaTranslate('actions.submit')}
              </Button>
            </form>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default VocabularyCreate;
