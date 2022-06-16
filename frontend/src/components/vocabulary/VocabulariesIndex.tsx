import React, { useState } from 'react'
import { VocabularyContext, useVocabularyContext } from 'contexts/VocabularyContext';
import VocabularyListTable from './VocabularyListTable';
import VocabularyCreate from './VocabularyCreate';
import VocabularyUpdate from './VocabularyUpdate';
import VocabularyBulkDelete from './VocabularyBulkDelete';
import VocabularySearchField from './VocabularySearchField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import { jaTranslate } from "locales/i18n";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { signOut } from 'lib/api/auth';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import PATH from "path/FRONTEND_PATH";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '88%',
      padding: '0px 20px',
      margin: '0 auto',
      marginTop: '20px',
    },
    flex: {
      display: "flex",
      alignItems: "center"
    },
    alignRight: {
      marginLeft: "auto",
      marginRight: "20px"
    },
    smallModal: {
      position: 'absolute' as 'absolute',
      top: '20%',
      left: '50%',
      height: '200px',
      padding: '20px 40px',
      transform: 'translate(-50%, -50%)',
      width: '240px',
      backgroundColor: 'white',
      boxShadow: '24',
      p: 4,
      overflowY: 'scroll'
    },
    buttonContainer: {
      width: '300px',
      marginTop: '30px'
    },
    button: {
      width: '80%'
    },
    marginRight: {
      marginRight: "20px"
    },
    warningText: {
      fontWeight: "bold"
    }
  })
);

const VocabulariesIndex = (): JSX.Element => {
  const ctx = useVocabularyContext();
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState<boolean>(false);
  const notifyLogOutSuccess = () => toast(jaTranslate('success.action', 'actions.logOut'));

  return (
    <VocabularyContext.Provider value={ctx}>
      <div className={classes.root}>
        <div className={classes.flex}>
          <h1>{jaTranslate('appName')}</h1>
          <span className={classes.alignRight}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setIsLogOutModalOpen(true)
              }}
            >
              {jaTranslate("actions.logOut")}
            </Button>
          </span>
        </div>

        <Modal
          open={isLogOutModalOpen}
          onClose={() => setIsLogOutModalOpen(false) }
        >
          <Box className={classes.smallModal}>
            <p className={classes.warningText}>本当にログアウトしますか？</p>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="error"
                className={classes.button}
                onClick={() => {
                  signOut();
                  notifyLogOutSuccess();
                  navigate(PATH.SIGN_IN)
                }}
              >
                {jaTranslate("actions.logOut")}
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="info"
                className={classes.button}
                onClick={() => { setIsLogOutModalOpen(false)} }
              >
                {jaTranslate("actions.back")}
              </Button>
            </div>
          </Box>
        </Modal>


        <VocabularySearchField />
        <VocabularyBulkDelete />
        <VocabularyCreate />
        <VocabularyUpdate />
        <VocabularyListTable />
      </div>
    </VocabularyContext.Provider>
  )
}

export default VocabulariesIndex;
