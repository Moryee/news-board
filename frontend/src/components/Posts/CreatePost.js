import React, { useMemo } from "react";
import PostForm from "./PostForm";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const api = useAxios();
  const formValues = useMemo(() => ({ title: "", link: "" }), []);

  const navigate = useNavigate();

  const onSubmit = async (postObject) => {
    try {
      await api.post(`/api/posts/`, postObject);
      navigate(0);
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <h1>Create a post</h1>
      <PostForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Create Post
      </PostForm>
    </>
  );
};

export default CreatePost;
