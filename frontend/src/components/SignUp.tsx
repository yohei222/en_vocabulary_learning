import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, TextField } from '@mui/material';
import { AuthContext } from "contexts/AuthContext";
import { signUp } from "lib/api/auth";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignUpParams } from "type";
import setCookies from "utilities/cookies/setCookies";
import { jaTranslate } from "locales/i18n"
import { yupResolver } from '@hookform/resolvers/yup';
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
    }
  })
);

const schema = yup.object({
  nickname: yup.string().required(),
}).required();

const SignUp = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpParams>({
    resolver: yupResolver(schema)
  });

  console.log(errors);

  const onSubmit: SubmitHandler<SignUpParams> = async (data: SignUpParams) => {
    const res = await signUp(data);

    if (res.status === 200) {
      setCookies(res);
      setIsSignedIn(true);
      setCurrentUser(res.data.data);

      navigate("/home");

      console.log("Signed in successfully!");
    } else {
      console.log("失敗!");
    }
  };

  // todo now validation messageの表示
  // githubソースコードをpushする！
  // エラーメッセージを日本語で表示するところから！
  // ログイン機能が良い感じに実装できたら、githubにpushする
  // →それをforkして、他の機能を実装していく、もしくはこのまま名前を変えて実装を続ける！

  return (
    <Container maxWidth="sm" className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
        <div className={classes.form}>
          <TextField
            fullWidth
            label={jaTranslate('model.user.nickname')}
            className={classes.form}
            {...register("nickname", { required: true, minLength: 2, maxLength: 10 })}
          />
          {errors.nickname?.message}
        </div>

        <div className={classes.form}>
          <TextField
            fullWidth
            label={jaTranslate('model.user.email')}
            className={classes.form}
            {...register("email", { required: true, minLength: 2, maxLength: 30 })}
          />
        </div>
        <div className={classes.form}>
          <TextField
            fullWidth
            label={jaTranslate('model.user.password')}
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
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

      <Button
        variant="contained"
        color="warning"
        size="large"
        className={classes.button}
        onClick={() => navigate('/sign_in')}>
        {jaTranslate('actions.login')}
      </Button>
    </Container>
  )
}

export default SignUp;
