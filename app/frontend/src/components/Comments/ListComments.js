import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentElement from './CommentElement';

import { useParams, useNavigate } from 'react-router-dom';
import CreateComment from './CreateComment';
import PostElement from '../Posts/PostElement';

const ListComments = () => {
  const [comments, setComments] = useState({
    results: []
  });
  const [post, setPost] = useState({})
  const { id, page } = useParams()

  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}/`)
      .then(({ data }) => {
        console.log(data)
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:8000/api/posts/${id}/comments/?page=${page ? page : 1}`)
      .then(({ data }) => {
        console.log(data)
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const Data = () => {
    return comments.results.map((res, i) => {
      return <CommentElement obj={res} key={i} />;
    });
  };

  function nextPage() {
    const queryString = require('query-string')
    var next = queryString.parseUrl(comments.next).query.page
    navigate(`/list-posts/${id}/comments/${next}`)
    navigate(0)
  }

  function previousPage() {
    const queryString = require('query-string')
    var previous = queryString.parseUrl(comments.previous).query.page
    if (previous) {
      navigate(`/list-posts/${id}/comments/${previous}`)
      navigate(0)
    }
    else {
      navigate(`/list-posts/${id}/comments`)
      navigate(0)
    }
  }

  return (
    <>
      <PostElement obj={post} key={post.id} />
      <CreateComment />
      {Data()}
      <div className='pegination'>
        {comments.previous &&
          <button className='previous' onClick={previousPage}>
            ⮜
          </button>}
        <span className='page-number'>{page ? page : 1}</span>
        {comments.next &&
          <button className='next' onClick={nextPage}>
            ⮞
          </button>}
      </div>
    </>
  );
};

export default ListComments;
