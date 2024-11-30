import axios from "axios";
const baseUrl = "/api/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      // this is the way to access the error message
      console.log(error.response.data.error);
      throw error.response.data.error;
    });
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      // this is the way to access the error message
      console.log(error.response.data.error);
      throw error.response.data.error;
    });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const personServices = {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};

export default personServices;
