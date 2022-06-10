import client from "lib/api/client"
import { SignUpParams, SignInParams } from "type";
import API_PATH from "path/API_PATH";
import getCookies from "utilities/cookies/getCookies";

export const signUp = (params: SignUpParams) => {
  return client.post(API_PATH.AUTH.SIGN_UP, params);
}

export const signIn = (params: SignInParams)  => {
  return client.post(API_PATH.AUTH.SIGN_IN, params);
}

export const signOut = () => {
  const { accessToken, cookieClient, uid } = getCookies();

  return client.delete(API_PATH.AUTH.SIGN_OUT, {
    headers: {
      "access-token": accessToken as string,
      "client": cookieClient as string,
      "uid": uid as string,
    },
  });
}

export const getCurrentUser = () => {
  const { accessToken, cookieClient, uid } = getCookies();

  if (!accessToken || !client || !uid) return
  return client.get(API_PATH.AUTH.SESSIONS, {
    headers: {
      "access-token": accessToken as string,
      "client": cookieClient as string,
      "uid": uid as string,
    },
  });
}
