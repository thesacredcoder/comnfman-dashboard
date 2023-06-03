import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Cookie = `token=${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const fetchAllConferences = async (req) => {
  const cookie = req.headers.cookie;

  const response = await API.get("conferences/allOngoing", {
    headers: {
      Cookie: cookie,
    },
  });
  return response;
};

export const joinConference = async (conferenceId) =>
  await API.post(`conferences/join/${conferenceId}`);

export const fetchMyConfernces = async (req) => {
  const cookie = req.headers.cookie;

  const response = await API.get("conferences/myConf", {
    headers: {
      Cookie: cookie,
    },
  });
  return response;
};

export const fetchCreatedConferences = async (req) => {
  const cookie = req.headers.cookie;

  const response = await API.get("conferences/fetchCreated", {
    headers: {
      Cookie: cookie,
    },
  });

  console.log(response);

  return response;
};

export const uploadPaper = async (formData) =>
  await API.post("papers/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const fetchPaperDetails = async (req) => {
  const cookie = req.headers.cookie;

  const response = await API.get("papers/fetch", {
    headers: {
      Cookie: cookie,
    },
  });

  return response;
};

export const fetchAssignedPapers = async (req, reviewerId) => {
  const cookie = req.headers.cookie;

  const response = await API.get(`reviewers/fetch/papers`, {
    headers: {
      Cookie: cookie,
    },
  });

  return response;
};

export const updateConference = async (conferenceId, updatedConference) =>
  await API.put(`conferences/update/${conferenceId}`, updatedConference);

export const createConference = async (formData) =>
  await API.post("conferences/create", formData);
