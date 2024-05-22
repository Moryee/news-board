import React from "react";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

function user_decoder(data) {
  if (data) {
    jwt_decode(data.access);
    return {
      username: data.username,
      email: data.email,
    };
  }
  return null;
}

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? user_decoder(JSON.parse(localStorage.getItem("authTokens")))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(user_decoder(data));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      console.log(">>>LOGIN ERROR", response, data);
      alert("Something went wrong!");
    }
  };

  const registerUser = async (username, email, password1, password2) => {
    const response = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2,
      }),
    });
    if (response.status === 201) {
      navigate("/login");
    } else {
      const data = await response.json();
      console.log(">>>REGISTER ERROR", response, data);
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  function isAuthor(post_author) {
    if (user === null) {
      return false;
    }

    if (user.username === post_author) {
      return true;
    }
    return false;
  }

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,

    // other
    user_decoder,
    isAuthor,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(user_decoder(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
