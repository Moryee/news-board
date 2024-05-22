import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../Controls/TextInput';


const PostForm = (props) => {
  console.log(props);
  return (
    <>
      <Formik 
        {...props}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Required'),
          link: Yup.string().url('Invalid url')
        })}
      >
        <Form>
          <TextInput
            name='title'
            type='text'
            placeholder='Title'
          />
          <TextInput
            name='link'
            type='text'
            placeholder='Link'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default PostForm
