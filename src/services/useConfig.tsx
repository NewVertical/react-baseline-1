import axios from "axios";

export const useConfig = () => {
  axios.defaults.withCredentials = true;
  return {
    endpoint: import.meta.env.VITE_API_CONNECTION,

    axiosConfig: {
      headers: {
        "Cache-Control": "no-cache",
      },
    },
  };
};
