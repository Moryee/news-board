import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../Controls';


const LoginForm = (props) => {
  console.log(props);
  return (
    <>
      <Formik
        {...props}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required')
        })}
      >
        <Form className='auth'>
          <TextInput
            name='username'
            type='text'
            placeholder='Usename'
          />
          <TextInput
            name='password'
            type='password'
            placeholder='Password'
          />
          <button type='submit'>Log In</button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm