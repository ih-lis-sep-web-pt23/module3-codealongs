import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    // retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const getAllProjects = () => {
  return axios.get(`${baseURL}/projects`);
};

export const getProject = id => {
  return axios.get(`${baseURL}/projects/${id}`);
};

export const addProject = project => {
  return axios.post(`${baseURL}/projects`, project);
};

export const updateProject = updatedProject => {
  return axios.put(`${baseURL}/projects/${updatedProject._id}`, updatedProject);
};

export const deleteProject = id => {
  return axios.delete(`${baseURL}/projects/${id}`);
};

export const addTask = task => {
  return axios.post(`${baseURL}/tasks`, task);
};
