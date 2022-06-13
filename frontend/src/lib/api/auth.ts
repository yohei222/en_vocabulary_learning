import client, { postRequest } from "lib/api/client"
import { SignUpParams, SignInParams } from "type";
import API_PATH from "path/API_PATH";
import getCookies from "utilities/cookies/getCookies";

export const tokenAuthHeaders = () => {
  const { accessToken, cookieClient, uid } = getCookies();

  return {
    "access-token": accessToken as string,
    "client": cookieClient as string,
    "uid": uid as string,
  }
}

export const signUp = async (params: SignUpParams) => {
  return postRequest(API_PATH.AUTH.SIGN_UP, params);
}

export const signIn = (params: SignInParams)  => {
  return postRequest(API_PATH.AUTH.SIGN_IN, params);
}

export const signOut = () => {
  return client.delete(API_PATH.AUTH.SIGN_OUT, {
    headers: tokenAuthHeaders()
  });
}

export const getCurrentUser = () => {
  const { accessToken, cookieClient, uid } = getCookies();
  if (!accessToken || !cookieClient || !uid) return;

  return client.get(API_PATH.AUTH.SESSIONS, {
    headers: tokenAuthHeaders(),
  });
}
