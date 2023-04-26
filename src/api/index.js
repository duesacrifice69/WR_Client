import axios from "axios";

const config = {
  header: {
    "Content-type": "appliation/json",
  },
};

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signin = async (formData) => {
  const response = await API.post("user/signin", formData, config);
  return response.data;
};
