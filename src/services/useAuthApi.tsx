import axios from "axios";
import { AxiosResponse } from "axios";
import { useAuth } from "./useAuth.tsx";
import { useConfig } from "./useConfig.tsx";

export const useAuthApi = () => {
  const { token, logout } = useAuth();
  const { endpoint } = useConfig();
  const handleError = (error: any) => {
    if (error.response.status === 401) logout();
  };
  return {
    get: async (url: string): Promise<AxiosResponse<any>> => {
      const tokenStr = token();
      try {
        return await axios.get(`${endpoint}${url}`, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        });
      } catch (error: any) {
        handleError(error);
      }
      return { data: {} } as AxiosResponse;
    },
    deleteReq: async (url: string): Promise<AxiosResponse<any>> => {
      const tokenStr = token();
      try {
        return await axios.delete(`${endpoint}${url}`, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        });
      } catch (error: any) {
        handleError(error);
      }
      return { data: {} } as AxiosResponse;
    },
    postForm: async (url: string, content: any) => {
      const tokenStr = token();
      try {
        return await axios.postForm(`${endpoint}${url}`, content, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        });
      } catch (error: any) {
        handleError(error);
      }
      return { data: {} } as AxiosResponse;
    },
    post: async (url: string, content: any): Promise<AxiosResponse<any>> => {
      const tokenStr = token();
      try {
        return await axios.post(`${endpoint}${url}`, content, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        });
      } catch (error: any) {
        handleError(error);
      }
      return { data: {} } as AxiosResponse;
    },
    put: async (url: string, content: any): Promise<AxiosResponse<any>> => {
      const tokenStr = token();
      try {
        return await axios.put(`${endpoint}${url}`, content, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        });
      } catch (error: any) {
        handleError(error);
      }
      return { data: {} } as AxiosResponse;
    },
  };
};
