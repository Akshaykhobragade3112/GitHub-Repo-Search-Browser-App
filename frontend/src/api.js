import axios from "axios";

const API = axios.create({
  baseURL: "https://github-repo-searchapp-backend.onrender.com/api",
});

export default API;
