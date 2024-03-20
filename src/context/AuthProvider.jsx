// import { createContext, useState, useEffect, useContext } from "react";
// import axios from "../api/axios";
// import Cookies from "js-cookie";

// export const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("use Auth propvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) ?? null
//   );
//   const [isAuth, setIsAuth] = useState(
//     JSON.parse(localStorage.getItem("isAuth")) ?? false
//   );
//   const [error, setError] = useState(null);
//   const [spinner, setSpinner] = useState(false);

//   const [clickProvider, setClickProvider] = useState(false);

//   useEffect(() => {
//     setSpinner(true);
//     setTimeout(() => {
//       setSpinner(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("isAuth", JSON.stringify(isAuth));
//   }, [isAuth]);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   //login
//   const signin = async (data) => {
//     try {
//       const res = await axios.post("/signin", data);

//       setUser(res.data);
//       setIsAuth(true);

//       return res.data;
//     } catch (error) {
//       if (Array.isArray(error.response.data)) {
//         return setError(error.response.data);
//       }
//       setError([error.response.data.message]);
//     }
//   };

//   //registro
//   const signup = async (data) => {
//     try {
//       const res = await axios.post("/signup", data);
//       setUser(res.data);
//       setUser(res.data);
//       setIsAuth(true);
//       return res.data;
//     } catch (error) {
//       if (Array.isArray(error.response.data)) {
//         return setError(error.response.data);
//       }
//       setError([error.response.data.message]);
//     }
//   };

//   useEffect(() => {
//     if (Cookies.get("token")) {
//       axios
//         .get("/profile")
//         .then((res) => {
//           setUser(res.data);
//           setIsAuth(true);
//         })
//         .catch((err) => {
//           setUser(null);
//           setIsAuth(false);
//         });
//     }
//   }, [isAuth]);

//   const signout = async () => {
//     const res = await axios.post("/signout");
//     setUser(null);
//     setIsAuth(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuth,
//         error,
//         signup,
//         signin,
//         signout,
//         spinner,
//         clickProvider,
//         setClickProvider,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom"; // Paso 1: Importa useHistory

const AuthContext = React.createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const history = useHistory(); // Paso 1: Obtenemos la instancia de history
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) ?? false
  );
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [clickProvider, setClickProvider] = useState(false);

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (Cookies.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch((err) => {
          setUser(null);
          setIsAuth(false);
          history.push("/login"); // Paso 2: Redirigimos al usuario al inicio de sesión
        });
    } else {
      setUser(null);
      setIsAuth(false);
    }
  }, [isAuth, history]); // Asegúrate de incluir history en las dependencias del useEffect

  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data);

      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  };

  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  };

  const signout = async () => {
    const res = await axios.post("/signout");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        error,
        signup,
        signin,
        signout,
        spinner,
        clickProvider,
        setClickProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
