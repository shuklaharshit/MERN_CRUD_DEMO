import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log(error, "error");
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, setData, loading, error };
};

export default useFetch;
