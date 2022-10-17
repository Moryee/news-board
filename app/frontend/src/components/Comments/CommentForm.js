import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../Controls';


const CommentForm = (props) => {
  console.log(props);
  return (
    <>
      <Formik
        {...props}
        validationSchema={Yup.object().shape({
          body: Yup.string().required('Required'),
        })}
      >
        <Form>
          <TextInput
            name='body'
            type='text'
            placeholder='Body'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default CommentForm