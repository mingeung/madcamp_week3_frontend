// axiosConfig.js (새 파일)
import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.10.7.24:80",
});

export default instance;
