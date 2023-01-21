import axios from "axios";

export const getDataApi = async (url, signal) => {
  if (!url || !url.trim()) throw new Error("The enpooind is required");
  return axios.get(url, { signal });
};
