import axios from "axios";

const config = {
  header: {
    "Content-type": "appliation/json",
  },
};

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL || "http://localhost:5000",
});

export const signin = async (formData) => {
  const response = await API.post("user/signin", formData, config);
  return response.data;
};

export const getMenuItems = async (userRoleId) => {
  const response = await API.post(
    "user/menus",
    { userRoleId: userRoleId },
    config
  );
  return response.data;
};

export const getAllCompanies = async () => {
  const response = await API.get("company/companies");

  return response.data;
};

export const createCompany = async (value) => {
  const response = await API.post("company/create", value);

  return response.data;
};

export const deleteCompany = async (value) => {
  const response = await API.delete("company/delete", value);

  return response.data;
};
