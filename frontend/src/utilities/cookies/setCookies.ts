import Cookies from "js-cookie";

const setCookies = (headers: { [x: string]: string; }) => {
  Cookies.set("access-token", headers["access-token"]);
  Cookies.set("client", headers["client"]);
  Cookies.set("uid", headers["uid"]);
};

export default setCookies;
