import { createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Loading from "components/Loading";
import { VocabularyContext } from 'contexts/VocabularyContext';
import React, { useContext, useState } from 'react';
import { Vocabulary } from 'type';
import { jaTranslate } from "locales/i18n";
import moment from "moment"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 500,
      marginTop: '20px'
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
    span: {
      fontWeight: 'bold'
    }
  })
);

const VocabularyListTable = (): JSX.Element => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Vocabulary | undefined>(undefined);

  const {
    isLoading,
    vocabularyList,
    setCheckedRecordIds
  } = useContext(VocabularyContext);

  if (isLoading) {
    return <Loading />
  }

  const columns: GridColDef[] = [
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
    },
    {
      field: 'createdAt',
      headerName: jaTranslate('model.vocabulary.createdAt'),
      width: 200,
    },
    {
      field: 'memo',
      headerName: jaTranslate('model.vocabulary.memo'),
      width: 500,
      sortable: false
    },
  ];

  const rows = vocabularyList.map((vocabulary) => {
    const jaDateTime = moment(vocabulary.createdAt).format(jaTranslate('format.date.default'))

    return {
      id: vocabulary.id,
      vocabulary_en: vocabulary.vocabularyEn,
      meaning_ja: vocabulary.meaningJa,
      comprehension_rate: jaTranslate(`model.vocabulary.comprehensionRateList.${vocabulary.vocabularyDetail.comprehensionRate}`),
      memo: vocabulary.vocabularyDetail.memo,
      createdAt: jaDateTime,
    }
  })

  const onCellClick = (params: GridCellParams) => {
    const checkedId = params.row.id
    if (params.field === '__check__') return;

    const record = vocabularyList.find((vocabulary) => (
      vocabulary.id === checkedId
    ))
    setSelectedRecord(record);
    setIsModalOpen(true);
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
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) =>
            setCheckedRecordIds(newSelection)
          }
        />
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box className={ classes.modal }>
          {(selectedRecord) && (
            <>
              <h2 id="parent-modal-title">
                {selectedRecord.vocabularyEn} : {selectedRecord.meaningJa}
              </h2>
              {(selectedRecord.vocabularyUsages) && (
                (selectedRecord.vocabularyUsages).map((usage, i) => {
                  return (
                    <>
                      <h3 id="parent-modal-title">definition{i+1}</h3>
                      <span className={classes.span}>{usage.definition}</span>
                      <br />

                      {(usage.examples) && (
                        (usage.examples.split(", ")).map((example: string, j: number) => {
                          return (
                            <p id="parent-modal-description">
                              <span className={classes.span}>example{j + 1}:</span> {example}
                            </p>
                          )
                        })
                      )}
                    </>
                  )
                })
              )}
            </>
          )}
          {/* todo 編集できるモーダルを作成する？ */}
          {/* <ChildModal /> */}
        </Box>
      </Modal>

    </>

  )
}

export default VocabularyListTable;
