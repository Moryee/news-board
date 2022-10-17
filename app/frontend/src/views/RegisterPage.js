import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import RegisterForm from "../components/Auth/RegisterForm";

function RegisterPage() {
  const [formValues, setFormValues] = useState({ username: '', email: '', password1: '', password2: '' })
  const { registerUser } = useContext(AuthContext);

  const onSubmit = async e => {
    registerUser(e.username, e.email, e.password1, e.password2);
  };

  return (
    <RegisterForm initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize>
      Login
    </RegisterForm>
  )
}

export default RegisterPage;
