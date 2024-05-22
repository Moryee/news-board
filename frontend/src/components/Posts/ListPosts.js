import React, { useState, useEffect } from "react";
import axios from "axios";
import PostElement from "./PostElement";
import { useParams, useNavigate } from "react-router-dom";

const ListPosts = () => {
  const [posts, setPosts] = useState({
    results: [],
  });

  const { page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/?page=${page ? page : 1}`)
      .then(({ data }) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const Data = () => {
    return posts.results.map((res, i) => {
      return <PostElement obj={res} key={i} />;
    });
  };

  function nextPage() {
    const queryString = require("query-string");
    var next = queryString.parseUrl(posts.next).query.page;
    navigate(`/list-posts/${next}`);
    navigate(0);
  }

  function previousPage() {
    const queryString = require("query-string");
    var previous = queryString.parseUrl(posts.previous).query.page;
    if (previous) {
      navigate(`/list-posts/${previous}`);
      navigate(0);
    } else {
      navigate(`/list-posts`);
      navigate(0);
    }
  }

  return (
    <>
      {Data()}
      <div className="pegination">
        {posts.previous && (
          <button className="previous" onClick={previousPage}>
            ⮜
          </button>
        )}
        <span className="page-number">{page ? page : 1}</span>
        {posts.next && (
          <button className="next" onClick={nextPage}>
            ⮞
          </button>
        )}
      </div>
    </>
  );
};

export default ListPosts;
