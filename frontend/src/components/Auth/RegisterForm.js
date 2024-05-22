import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../Controls";

const RegisterForm = (props) => {
  console.log(props);
  return (
    <>
      <Formik
        {...props}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          password1: Yup.string().required("Required").min(8),
          password2: Yup.string().required("Required").min(8),
        })}
      >
        <Form className="auth">
          <TextInput name="username" type="text" placeholder="Usename" />
          <TextInput name="email" type="text" placeholder="Email" />
          <TextInput name="password1" type="password" placeholder="Password" />
          <TextInput name="password2" type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
