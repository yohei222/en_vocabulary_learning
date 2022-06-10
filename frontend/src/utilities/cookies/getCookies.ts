import Cookies from "js-cookie";

type cookieType = {
  accessToken: String;
  cookieClient: String;
  uid: String;
};

const getCookies = (): cookieType => {
  const accessToken = Cookies.get("access-token") || ""
  const cookieClient = Cookies.get("client") || ""
  const uid = Cookies.get("uid") || ""

  return {
    accessToken,
    cookieClient,
    uid,
  };
};

export default getCookies;
