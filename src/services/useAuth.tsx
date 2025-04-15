import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useConfig } from "./useConfig.tsx";
import { useLocalStorage } from "./useLocalStorage.tsx";

export interface AuthContext {
  isAuthenticated: () => boolean;
  login: (user: any) => Promise<void>;
  logout: () => Promise<void>;
  user: any | null;
}

export const AuthContext = createContext<AuthContext | null>(null);

const key = "tanstack.auth.user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage(key, null);

  const isAuthenticated = () => {
    return localStorage.getItem(key) !== "null";
  };

  const logout = useCallback(async () => {
    localStorage.removeItem(key);
  }, []);

  const login = useCallback(async (iuser: any) => {
    setUser({ ...iuser });
  }, []);

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const [user, setUser] = useLocalStorage(key, null);
  const [message, setMessage] = useState("");
  const context = useContext(AuthContext);
  const { endpoint } = useConfig();
  return {
    user: user,
    message: message,
    token: () => {
      return user.token;
    },
    logout: async () => {
      setUser(null);
      await context?.logout();
    },
    isAuthenticated: () => {
      console.log("calling is auth here", !!localStorage.getItem(key));
      return localStorage.getItem(key) && localStorage.getItem(key) != "null";
    },
    authenticate: async (email: string, password: string) => {
      try {
        const { data }: any = await axios.post(`${endpoint}/loginLite`, {
          email: email,
          password: password,
        });
        setUser(data);
        return true;
      } catch (e: any) {
        console.error("error received", e);
        console.log("result", e.response.data.Errors[0]);
        setMessage("Login Failed, please try again.");
      }
      return false;
    },
    authLite: async (phone: string) => {
      try {
        const { data }: any = await axios.post(`${endpoint}/auth/lite`, {
          phone: phone,
        });
        if (data.authenticated) {
          setUser(data);
          await context?.login(data);
          return data;
        }

        return null;
      } catch (e: any) {
        console.error("error received", e);
        console.log("result", e.response.data.Errors[0]);
        setMessage("Login Failed, please try again.");
      }
      return false;
    },
  };
};
