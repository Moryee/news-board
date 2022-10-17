import React, { useState } from "react";
import PostForm from "./PostForm";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const api = useAxios();
  const [formValues, setFormValues] =
    useState({ title: '', link: '' })
  const navigate = useNavigate()

  const onSubmit = async (postObject) => {
    try {
      await api.post(`/api/posts/`,
        postObject
      );
      navigate(0)
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <>
      <h1>What's On Your Mind?</h1>
      <PostForm initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize>
        Create Post
      </PostForm>
    </>
  )
}

export default CreatePost
