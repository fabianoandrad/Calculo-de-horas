import axios from "axios";

const api = axios.create({
  baseURL: "http://calculatorbd-com.umbler.net",
});

export default api;
