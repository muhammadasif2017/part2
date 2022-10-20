import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

const createPerson = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => { 
    console.log(response.data);
    return response.data
  });
};

const personServices = {
  getAllPersons, 
  createPerson, 
  updatePerson,
  deletePerson
}

export default personServices;
