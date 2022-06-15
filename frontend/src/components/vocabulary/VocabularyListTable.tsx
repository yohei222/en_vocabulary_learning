import { createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataGrid, GridCellParams, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Loading from "components/Loading";
import { VocabularyContext } from 'contexts/VocabularyContext';
import React, { useContext, useState, useEffect } from 'react';
import { Vocabulary } from 'type';

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
    setIsLoading,
    vocabularyList,
    setVocabularyList,
    params,
    setParams,
    checkedRecordIds,
    setCheckedRecordIds
  } = useContext(VocabularyContext);

  if (isLoading) {
    return <Loading />
  }

  const columns: GridColDef[] = [
    {
      field: 'vocabulary_en',
      headerName: 'Vocabulary',
      width: 150,
    },
    {
      field: 'meaning_ja',
      headerName: '意味',
      width: 300,
    },
    {
      field: 'comprehension_rate',
      headerName: '理解度',
      width: 110,
    },
    {
      field: 'memo',
      headerName: 'メモ',
      width: 600,
    },
  ];

  const rows = vocabularyList.map((vocabulary) => {
    return {
      id: vocabulary.id,
      vocabulary_en: vocabulary.vocabularyEn,
      meaning_ja: vocabulary.meaningJa,
      // jaTranslateで翻訳する必要がある
      comprehension_rate: vocabulary.vocabularyDetail.comprehensionRate,
      memo: vocabulary.vocabularyDetail.memo,
    }
  })

  // todo 一括選択などの処理に対応できるようにする
  // ↓これを参考に実装する！
  // https://codesandbox.io/s/unruffled-hawking-8kez0?fontsize=14&hidenavigation=1&theme=dark&view=editor
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
          {/* 編集できるモーダルを作成する？ */}
          {/* <ChildModal /> */}
        </Box>
      </Modal>

    </>

  )
}

export default VocabularyListTable;
