import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useAxios from '../../utils/useAxios';


const UpdatePost = (props) => {
  const [formValues, setFormValues] = useState({
    title: '',
    link: '',
  });
  let { id } = useParams()
  const navigate = useNavigate()
  const api = useAxios();

  const onSubmit = async (postObject) => {
    try {
      await api.put(`/api/posts/${id}/`,
        postObject
      );
      navigate('/')
    } catch {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/posts/${id}/`
      )
      .then((res) => {
        const { title, link } = res.data;
        setFormValues({ title, link });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PostForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Post
    </PostForm>
  );
};

export default UpdatePost;
