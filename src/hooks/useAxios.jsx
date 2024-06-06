/*import { useState } from "react";
import { API } from '../api/api.js'

export const REQ_TYPES = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
});

export const useAxios = (initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = ({ reqType, endpoint, payload, config }) => {
    setLoading(true);
    return API[reqType](endpoint, payload, config)
      .then((res) => {
        setData(res.data);
        setError(null);
        return res.data;
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        throw err;
      })
      .finally(() => setLoading(false));
  };
  return [sendRequest, data, loading, error];
};

{/* Bu, API isteklerinin ve istek durumlarının merkezi bir şekilde yönetilmesini sağlar. */}

{/* API isteklerini yöneten sendRequest fonksiyonu, belirtilen istek türüne ve endpoint'e göre ilgili API fonksiyonunu 
çağırır ve gelen veriyi state'e yerleştirir. Ayrıca, hata durumlarını ele alır ve uygun şekilde günceller. */}
