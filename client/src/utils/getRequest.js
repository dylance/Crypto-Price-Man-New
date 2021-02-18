import axios from 'axios';

const getRequest = async (url) => {
  try {
    const res = axios.get(url);
    console.log('The response data is: ', res.data);
  } catch (err) {
    console.log('The error is: ', error);
  }
};

export default getRequest;
