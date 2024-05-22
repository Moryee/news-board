import React, { useMemo } from "react";
import useAxios from "../../utils/useAxios";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const CreateComment = () => {
  const api = useAxios();
  const formValues = useMemo(
    () => ({
      body: "",
    }),
    []
  );
  let { id } = useParams();

  const onSubmit = async (object) => {
    try {
      await api.post(`/api/posts/${id}/comments/`, object);
      window.location.reload(false);
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <h1>Add a comment</h1>
      <CommentForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Create Comment
      </CommentForm>
    </>
  );
};

export default CreateComment;
