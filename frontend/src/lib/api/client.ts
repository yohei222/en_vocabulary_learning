import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
  }),
  options
);

export const postRequest = async (path: string, params: any) => {
  try {
    const response = await client.post(path, params);
    return { headers: response.headers, responseData: response.data.data, status: response.status };
  } catch (error: any) {
    return { headers: undefined, responseData: undefined, status: error.response?.status };
  }
}

export default client;
