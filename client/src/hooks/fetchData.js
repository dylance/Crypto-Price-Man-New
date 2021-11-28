import { useState, useEffect } from 'react';
import axios from 'axios';

export const fetchData = (initialUrl) => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        if (!result.data) {
          setData([]);
        } else {
          setData(result.data);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    getData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
