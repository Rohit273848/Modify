import { createContext,useState,useEffect } from "react";
import { authService } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    // 🔹 Check user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getMe();
        setUser(data.user); // depends on your backend response
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Login function
  const login = async (identifier, password) => {
    const data = await authService.login(identifier, password);
    setUser(data.user); // adjust if needed
    return data;
  };

  // 🔹 Register function
  const register = async (username, email, password) => {
    const data = await authService.register(username, email, password);
    setUser(data.user);
    return data;
  };

  // 🔹 Logout function
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}