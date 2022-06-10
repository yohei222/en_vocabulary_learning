import { AuthContext } from "contexts/AuthContext";
import Cookies from "js-cookie";
import { signIn } from "lib/api/auth";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignInParams } from "type";
import setCookies from "utilities/cookies/setCookies";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInParams>();
  const onSubmit: SubmitHandler<SignInParams> = async (data: SignInParams) => {
    try {
      const res = await signIn(data);

      if (res.status === 200) {
        setCookies(res);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/home");

        console.log("Signed in successfully!");
      } else {
        console.log("失敗!");
      }
    } catch (err) {
      console.log(err)
      console.log("失敗!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true, minLength: 6, maxLength: 20 })} />
      <input type="submit" />
    </form>
  )
}

export default SignIn;
