import { yupResolver } from '@hookform/resolvers/yup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, TextField } from '@mui/material';
import Color from 'Color';
import { AuthContext } from "contexts/AuthContext";
import { signIn } from "lib/api/auth";
import { jaTranslate } from "locales/i18n";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignInParams } from "type";
import setCookies from "utilities/cookies/setCookies";
import * as yup from "yup";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
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
    }
  })
);

const schema = yup.object({
  email: yup.string().min(6).required(
    jaTranslate('errors.required', 'model.user.email')
  ),
  password: yup.string().min(6).required(
    jaTranslate('errors.required', 'model.user.password')
  ),
}).required();

const SignIn = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const notifySignInSuccess = () => toast(jaTranslate('success.action', 'actions.signIn'));
  const notifySignInFailure = () => toast(jaTranslate('failure.action', 'actions.signIn'));

  const { register, handleSubmit, formState: { errors } } = useForm<SignInParams>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SignInParams> = async (data: SignInParams) => {
    const { headers, responseData, status } = await signIn(data);

    if ((status === 200) && headers) {
      setCurrentUser(responseData);
      setIsSignedIn(true);
      setCookies(headers);

      navigate("/home");
      notifySignInSuccess();
    } else {
      notifySignInFailure();
    }
  };

  return (
    <Container maxWidth = "sm" className = { classes.root } >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
        <div className={classes.form}>
          <TextField
            fullWidth
            label={jaTranslate('model.user.email')}
            className={classes.form}
            {...register("email", { required: true, minLength: 2, maxLength: 30 })}
          />
          {errors.email && (
            <span className={classes.errorMessage} color="danger">
              * {errors.email.message}
            </span>
          )}
        </div>
        <div className={classes.form}>
          <TextField
            fullWidth
            label={jaTranslate('model.user.password')}
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
          />
          {errors.password && (
            <span className={classes.errorMessage} color="danger">
              * {errors.password.message}
            </span>
          )}
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

      <Button
        variant="contained"
        color="warning"
        size="large"
        className={classes.button}
        onClick={() => navigate('/sign_up')}>
        {jaTranslate('actions.signUp')}
      </Button>
    </Container >
  )
};

export default SignIn;
