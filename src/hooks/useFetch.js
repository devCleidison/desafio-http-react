import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);

  const [itemId, setItemId] = useState(null);
  const [callFetch, setCallFetch] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpRequest = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
      setMethod(method);
      setItemId(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError("Houve algum error ao pegar os dados");
      }

      setLoading(false);
    };

    fetchData();
  }, [callFetch, url]);

  useEffect(() => {
    const httpRequest = async () => {
      let json = null;
      if (method === "POST") {
        const fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();

        setCallFetch(json);
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;
        const res = await fetch(deleteUrl, config);
        json = await res.json();
      }

      setCallFetch(json);
    };

    httpRequest()
  }, [config, method, url, itemId]);

  return { data, httpRequest, loading, error };
};
