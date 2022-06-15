import CircularProgress from '@mui/material/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: '100px',
      margin: '0 auto'
    },
  })
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        color="success"
        className={classes.root}
      />
    </Box>
  )
};

export default Loading;
