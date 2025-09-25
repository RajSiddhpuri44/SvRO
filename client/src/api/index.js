import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5001/api" });
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // for cookies
});

export default API;
