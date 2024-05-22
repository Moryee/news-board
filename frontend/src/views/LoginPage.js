import React from "react";
import { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";

import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  const formValues = useMemo(() => ({ username: "", password: "" }), []);
  const { loginUser } = useContext(AuthContext);

  const onSubmit = (e) => {
    loginUser(e.username, e.password);
  };

  return (
    <LoginForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Login
    </LoginForm>
  );
};

export default LoginPage;
