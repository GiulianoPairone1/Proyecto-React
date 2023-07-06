import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [modoOscuro, setModoOscuro] = useState(true);
 
  const autenticarUsuario = async () => {
    
     // Verifica si esta en el localstorage el id
    if (localStorage.getItem("_id") === null) {
     
      setAuth({})
      return;
    }
    const _id = localStorage.getItem("_id");
   
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/usuarios/perfil/${_id}`
      );
      const { data } = response;
     
      setAuth(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, autenticarUsuario,setModoOscuro,modoOscuro }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };