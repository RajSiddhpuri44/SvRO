import axios from "axios";

const API = axios.create({ baseURL: "https://svro-backend.onrender.com/api" });

export default API;
