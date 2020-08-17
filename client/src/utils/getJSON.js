import axios from 'axios';

const getJSON = (url) => {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export default getJSON;
