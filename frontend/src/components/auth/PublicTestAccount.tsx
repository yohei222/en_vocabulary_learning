import { createStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: '50px',
    },
    bold: {
      fontWeight: 'bold',
      marginBottom: '20px'
    }
  })
);

const PublicTestAccount = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider />
      <p className={classes.bold}>テストアカウント</p>
      <span>↓こちらがテストアカウントになります。ご自由にお使いください。</span>
      <p>Emailアドレス: test@example.com</p>
      <p>パスワード: password</p>
    </div>
  )
}

export default PublicTestAccount;
