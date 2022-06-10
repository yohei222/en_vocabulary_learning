import Cookies from "js-cookie";

const setCookies = (res: { headers: { [x: string]: string; }; }) => {
  Cookies.set("access-token", res.headers["access-token"]);
  Cookies.set("client", res.headers["client"]);
  Cookies.set("uid", res.headers["uid"]);
};

export default setCookies;
