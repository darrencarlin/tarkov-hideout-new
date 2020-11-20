import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/",
});

export default api;
