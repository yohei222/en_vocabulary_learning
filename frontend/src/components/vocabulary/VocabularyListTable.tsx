import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Loading from "components/Loading";
import { VocabularyContext } from 'contexts/VocabularyContext';
import { patchRequest } from 'lib/api/client';
import { jaTranslate } from "locales/i18n";
import moment from "moment";
import API_PATH from 'path/API_PATH';
import React, { useContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import { Vocabulary } from 'type';
import pronounceVocabularyEn from 'utilities/pronounceVocabularyEn'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 550,
      marginTop: '20px',
      marginBottom: '40px'
    },
    modal: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      height: '80%',
      padding: '20px 40px',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      backgroundColor: 'white',
      boxShadow: '24',
      p: 4,
      overflowY: 'scroll'
    },
    smallModal: {
      position: 'absolute' as 'absolute',
      top: '40%',
      left: '50%',
      height: '300px',
      padding: '20px 40px',
      transform: 'translate(-50%, -50%)',
      width: '250px',
      backgroundColor: 'white',
      boxShadow: '24',
      p: 4,
      overflowY: 'scroll'
    },
    bold: {
      fontWeight: 'bold',
      marginRight: "5px"
    },
    buttonContainer : {
      width: '300px',
      marginTop: '30px'
    },
    button: {
      width: '80%'
    },
    fontBold: {
      fontWeight: "bold",
      marginLeft: "3px"
    },
    flex: {
      display: "flex",
      alignItems: "center"
    },
    modalButton: {
      height: "60%",
    },
    alignRight: {
      marginLeft: "auto",
      marginRight: "20px"
    },
    marginRight: {
      marginRight: "20px"
    },
    onCursor: {
      cursor: "pointer"
    },
    englishFont: {
      fontStyle: "italic"
    },
    marginBottom: {
      marginBottom: "10px",
    },
    overflowWrappedText: {
      display: "block",
      overflowWrap: "break-word"
    }
  })
);

const ModalTypes = {
  none: "none",
  comprehensionRateChangeModalOpen: "comprehensionRateChangeModalOpen",
  vocabularyDetailModalOpen: "vocabularyDetailModalOpen"
}

type StateType = {
  currentModalType: string
};

const modalChangeReducer = (_modalState: StateType, action: { type: string }) => {
  switch(action.type) {
    case ModalTypes.none:
      return { currentModalType: ModalTypes.none }
    case ModalTypes.comprehensionRateChangeModalOpen:
      return { currentModalType: ModalTypes.comprehensionRateChangeModalOpen }
    case ModalTypes.vocabularyDetailModalOpen:
      return { currentModalType: ModalTypes.vocabularyDetailModalOpen }
    default:
      throw new Error('Invalid Action')
  }
}

const VocabularyListTable = (): JSX.Element => {
  const classes = useStyles();
  const notifyUpdateSuccess = () => toast.success(jaTranslate('success.update', 'model.vocabulary.modelName'));
  const notifyUpdateFailure = () => toast.error(jaTranslate('failure.update', 'model.vocabulary.modelName'));

  const [modalState, dispatch] = useReducer(modalChangeReducer, { currentModalType: ModalTypes.none } )

  const {
    isLoading,
    setIsLoading,
    vocabularyList,
    setCheckedRecordIds,
    selectedRecord,
    setSelectedRecord,
    setIsUpdateModalOpen,
    renewRecords
  } = useContext(VocabularyContext);

  if (isLoading) {
    return <Loading />
  }

  const PronounceCell = () => {
    return (
      <span
        className={classes.onCursor}
      >
        <VolumeUpIcon />
      </span>
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'pronounce',
      headerName: "発音",
      renderCell: PronounceCell,
      width: 50,
      sortable: false
    },
    {
      field: 'vocabulary_en',
      headerName: jaTranslate('model.vocabulary.vocabularyEn'),
      width: 200,
    },
    {
      field: 'meaning_ja',
      headerName: jaTranslate('model.vocabulary.meaningJa'),
      width: 250,
      sortable: false
    },
    {
      field: 'comprehension_rate',
      headerName: jaTranslate('model.vocabulary.comprehensionRate'),
      width: 110,
      editable: true
    },
    {
      field: 'createdAt',
      headerName: jaTranslate('model.vocabulary.createdAt'),
      width: 250,
    },
    {
      field: 'updatedAt',
      headerName: jaTranslate('model.vocabulary.updatedAt'),
      width: 250,
    },
    {
      field: 'memo',
      headerName: jaTranslate('model.vocabulary.memo'),
      width: 500,
      sortable: false
    },
  ];

  const rows = vocabularyList.map((vocabulary) => {
    const jaCreatedAt = moment(vocabulary.createdAt).format(jaTranslate('format.datetime.default'))
    const jaUpdatedAt = moment(vocabulary.updatedAt).format(jaTranslate('format.datetime.default'))

    return {
      id: vocabulary.id,
      vocabulary_en: vocabulary.vocabularyEn,
      meaning_ja: vocabulary.meaningJa,
      comprehension_rate: jaTranslate(`model.vocabulary.comprehensionRateList.${vocabulary.vocabularyDetail.comprehensionRate}`),
      memo: vocabulary.vocabularyDetail.memo,
      createdAt: jaCreatedAt,
      updatedAt: jaUpdatedAt,
    }
  })

  const onComprehensionRateChangeClick = async (record: Vocabulary, clickedRate: string) => {
    const newRecord = record;
    newRecord.vocabularyDetail.comprehensionRate = clickedRate;

    setIsLoading(true);
    dispatch({type: ModalTypes.none})

    const { status } = await patchRequest(
      `${API_PATH.VOCABULARIES.UPDATE}/${record.id}`, newRecord
    );

    if (status === 200) {
      setSelectedRecord(undefined);
      notifyUpdateSuccess();
      renewRecords();
    } else {
      dispatch({ type: ModalTypes.comprehensionRateChangeModalOpen })
      notifyUpdateFailure();
    }

    setIsLoading(false);
  }

  const onCellClick = (params: GridCellParams) => {
    const checkedId = params.row.id
    const checkedField = params.field;

    const nonModalOpenColumns = ['__check__', 'pronounce']
    const record = vocabularyList.find((vocabulary) => (
      vocabulary.id === checkedId
    ))

    if (record === undefined) return;

    if (checkedField === 'pronounce') {
      const vocabularyEn = record.vocabularyEn;
      pronounceVocabularyEn(vocabularyEn);
    }

    if (nonModalOpenColumns.includes(checkedField)) return;
    setSelectedRecord(record);

    if (checkedField === "comprehension_rate") {
      dispatch({ type: ModalTypes.comprehensionRateChangeModalOpen })
      return;
    }

    dispatch({type: ModalTypes.vocabularyDetailModalOpen})
  };

  return (
    <>
      <div className={classes.root}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: 'createdAt', sort: 'desc' }],
            },
          }}
          rows={rows}
          columns={columns}
          onCellClick={onCellClick}
          onCellDoubleClick={(_params: GridCellParams, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
            }
          }}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) =>
            setCheckedRecordIds(newSelection)
          }
        />
      </div>

      <Modal
        open={modalState.currentModalType === ModalTypes.comprehensionRateChangeModalOpen}
        onClose={() => dispatch({ type: ModalTypes.none }) }
      >
        <Box className={classes.smallModal}>
          {(selectedRecord) && (
            <>
              <h3>{jaTranslate('crud.editWithObjectName', '理解度')}</h3>
              <p>{jaTranslate('model.vocabulary.vocabularyEn')}:
                <span className={classes.fontBold}>
                  {selectedRecord.vocabularyEn}
                </span>
              </p>
              <p>現在の理解度:
                <span className={classes.fontBold}>
                  {jaTranslate(`model.vocabulary.comprehensionRateList.${selectedRecord.vocabularyDetail.comprehensionRate}`)}
                </span>
              </p>

              {(selectedRecord.vocabularyDetail.comprehensionRate !== "high") && (
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="info"
                    className={classes.button}
                    onClick={() => { onComprehensionRateChangeClick(selectedRecord, "high") }}
                  >
                    {jaTranslate('crud.updateWithSpecifiedValue', 'model.vocabulary.comprehensionRateList.high')}
                  </Button>
                </div>
              )}

              {(selectedRecord.vocabularyDetail.comprehensionRate !== "middle") && (
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => { onComprehensionRateChangeClick(selectedRecord, "middle") }}
                  >
                    {jaTranslate('crud.updateWithSpecifiedValue', 'model.vocabulary.comprehensionRateList.middle')}
                  </Button>
                </div>
              )}

              {(selectedRecord.vocabularyDetail.comprehensionRate !== "low") && (
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="error"
                    className={classes.button}
                    onClick={() => { onComprehensionRateChangeClick(selectedRecord, "low") }}
                  >
                    {jaTranslate('crud.updateWithSpecifiedValue', 'model.vocabulary.comprehensionRateList.low')}
                  </Button>
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>

      <Modal
        open={modalState.currentModalType === ModalTypes.vocabularyDetailModalOpen}
        onClose={() => dispatch({type: ModalTypes.none})}
      >
        <Box className={ classes.modal }>
          {(selectedRecord) && (
            <>
              <div className={classes.flex}>
                <div className={classes.flex}>
                  <h2 id="parent-modal-title">
                    {selectedRecord.vocabularyEn} : {selectedRecord.meaningJa}
                  </h2>
                </div>
                <p className={classes.alignRight}>理解度:
                  <span className={classes.fontBold}>
                    {jaTranslate(`model.vocabulary.comprehensionRateList.${selectedRecord.vocabularyDetail.comprehensionRate}`)}
                  </span>
                </p>
                <span className={classes.marginRight}>
                  <Button
                    variant="contained"
                    color="info"
                    className={classes.modalButton}
                    onClick={() => {
                      dispatch({ type: ModalTypes.comprehensionRateChangeModalOpen })
                    }}
                  >
                    {jaTranslate("crud.editWithObjectName", "model.vocabulary.comprehensionRate")}
                  </Button>
                </span>
                <span className={classes.marginRight}>
                  <Button
                    variant="contained"
                    color="success"
                    className={classes.modalButton}
                    onClick={() => {
                      dispatch({ type: ModalTypes.none })
                      setIsUpdateModalOpen(true)
                    }}
                  >
                    {jaTranslate("crud.editWithObjectName", "model.vocabulary.modelName")}
                  </Button>
                </span>
                <span>
                  <Button
                    variant="contained"
                    color="warning"
                    className={classes.modalButton}
                    onClick={() => {
                      pronounceVocabularyEn(selectedRecord.vocabularyEn);
                    }}
                  >
                    <VolumeUpIcon />
                  </Button>
                </span>
              </div>
              <Divider />

              {(selectedRecord.vocabularyDetail.memo !== "") && (
                <>
                  <p className={classes.bold}>
                    {jaTranslate("model.vocabulary.memo")}
                  </p>
                  <div className={classes.overflowWrappedText}>
                    <span className={classes.bold}>
                      <p className={classes.englishFont}>{selectedRecord.vocabularyDetail.memo}</p>
                    </span>
                  </div>
                </>
              )}
              <Divider />

              {(selectedRecord.vocabularyUsages) && (
                (selectedRecord.vocabularyUsages).map((usage, i) => {
                  return (
                    <>
                      <div className={classes.marginBottom}>
                        <p className={classes.bold}>{jaTranslate("model.vocabulary.definition")}{i + 1}</p>
                        <span className={classes.bold}>
                          <span className={classes.englishFont}>{usage.definition}</span>
                        </span>

                        {(usage.examples) && (
                          (usage.examples.split(", ")).map((example: string, j: number) => {
                            return (
                              <p id="parent-modal-description">
                                <span className={classes.bold}>
                                  {jaTranslate("model.vocabulary.example")}{j + 1}:
                                </span>
                                <span className={classes.englishFont}>{example}</span>
                              </p>
                            )
                          })
                        )}
                      </div>
                      <Divider />
                    </>
                  )
                })
              )}
            </>
          )}
        </Box>
      </Modal>

    </>

  )
}

export default VocabularyListTable;
