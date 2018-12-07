import axios from 'axios';

const getJSON = url => {
  return axios.get(url)
    .then(response => {
      console.log("bittrex data is", response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      return error
  });
}

export default getJSON
