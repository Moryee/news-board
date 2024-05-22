import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";

const UpdateComment = (props) => {
  const [formValues, setFormValues] = useState({
    post: 0,
    body: "",
  });

  let { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  const onSubmit = async (object) => {
    try {
      await api.put(`/api/comments/${id}/`, object);
      console.log(object);
      navigate(`/list-posts/${formValues.post}/comments`);
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/comments/${id}/`)
      .then((res) => {
        const { post, body } = res.data;
        setFormValues({ post, body });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <CommentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Comment
    </CommentForm>
  );
};

export default UpdateComment;
