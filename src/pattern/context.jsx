import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 

  const login = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-in`, { email, password });

        // Lưu thông tin người dùng vào state user
        setUser(response?.data);
        
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };
  
  const logout = () => {
    // Xóa thông tin người dùng từ state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};