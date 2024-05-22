import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://localhost:8000/";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, user_decoder } =
    useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    console.log(">>>REQUEST");

    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs(), "hour") < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}auth/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(user_decoder(response.data));

    req.headers.Authorization = `Bearer ${response.data.access}`;

    return req;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(">>> RESPONSE ERROR");
      console.log(error);
      throw error;
    }
  );

  return axiosInstance;
};

export default useAxios;
