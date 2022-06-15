import { yupResolver } from '@hookform/resolvers/yup';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Color from 'Color';
import { VocabularyContext } from 'contexts/VocabularyContext';
import { patchRequest } from 'lib/api/client';
import { jaTranslate } from "locales/i18n";
import API_PATH from "path/API_PATH";
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { VocabularyCreateInput, VocabularyCreateParams } from "type";
import vocabularyInputToParamsConverter from 'utilities/vocabularyInputToParamsConverter';
import * as yup from "yup";

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

const schema = yup.object({
  vocabularyEn: yup.string().required(
    jaTranslate('errors.required', 'model.vocabulary.vocabularyEn')
  ),
  meaningJa: yup.string().required(
    jaTranslate('errors.required', 'model.vocabulary.meaningJa')
  ),
  comprehensionRate: yup.string().required(
    jaTranslate('errors.required', 'model.vocabulary.comprehensionRate')
  )
}).required();

const VocabularyUpdate = (): JSX.Element => {
  const classes = useStyles();
  const {
    setIsLoading,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    selectedRecord,
    renewRecords
  } = useContext(VocabularyContext);

  const notifyUpdateSuccess = () => toast(jaTranslate('success.update', 'model.vocabulary.modelName'));
  const notifyUpdateFailure = () => toast(jaTranslate('failure.update', 'model.vocabulary.modelName'));
  const [comprehensionValueLabel, setComprehensionValueLabel] = useState<string | undefined>(selectedRecord?.vocabularyDetail.comprehensionRate);

  const { register, handleSubmit, formState: { errors } } = useForm<VocabularyCreateInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      vocabularyEn: selectedRecord?.vocabularyEn,
      meaningJa: selectedRecord?.meaningJa,
      comprehensionRate: selectedRecord?.vocabularyDetail.comprehensionRate,
      memo: selectedRecord?.vocabularyDetail.memo
    },
  });

  const onSubmit: SubmitHandler<VocabularyCreateInput> = async (data: VocabularyCreateInput) => {
    const body: VocabularyCreateParams = vocabularyInputToParamsConverter(data)

    setIsLoading(true);
    setIsUpdateModalOpen(false);
    const { status } = await patchRequest(
      `${API_PATH.VOCABULARIES.UPDATE}/${selectedRecord?.id}`, body
    );

    if (status === 200) {
      notifyUpdateSuccess();
      renewRecords();
    } else {
      setIsUpdateModalOpen(true);
      notifyUpdateFailure();
    }
    setIsLoading(false);
  };

  return (
    <>
      {(isUpdateModalOpen && selectedRecord) && (
        <Modal
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        >
          <Box className={classes.modal}>
            <h2>英単語を編集する</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
              <div className={classes.form}>
                <TextField
                  fullWidth
                  label={jaTranslate('model.vocabulary.vocabularyEn')}
                  className={classes.form}
                  defaultValue={selectedRecord?.vocabularyEn}
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
                  label={jaTranslate('model.vocabulary.meaningJa')}
                  className={classes.form}
                  defaultValue={selectedRecord?.meaningJa}
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
                    defaultValue={selectedRecord?.vocabularyDetail.comprehensionRate}
                    label={jaTranslate('model.vocabulary.comprehensionRate')}
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

              <div className={classes.form}>
                <TextField
                  multiline
                  fullWidth
                  defaultValue={selectedRecord?.vocabularyDetail.memo}
                  rows={2}
                  label={jaTranslate('model.vocabulary.memo')}
                  className={classes.form}
                  {...register("memo")}
                />
              </div>

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

export default VocabularyUpdate;
