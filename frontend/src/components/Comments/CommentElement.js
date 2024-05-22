import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import AuthContext from '../../context/AuthContext';

const CommentElement = (props) => {
  const { id, username, body, created_on } = props.obj;
  const api = useAxios();
  const { isAuthor } = useContext(AuthContext)

  const deleteComment = async () => {
    try {
      await api.delete(`/api/comments/${id}/`);
      window.location.reload();
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className='comment'>
      <div className='comment-header'>
        <span className='username'>{username}</span>
        <span className='created-on'>{created_on}</span>
        {isAuthor(username) &&
          <div className='dropdown'>
            <span>⠄⠄⠄</span>
            <div className='dropdown-content'>
              <Link className='update'
                to={'/update-comment/' + id}>
                Update
              </Link>
              <button className='delete' onClick={deleteComment}>
                Delete
              </button>
            </div>
          </div>
        }
      </div>
      <div className='comment-body'>
        <div className='title'>{body}</div>
      </div>
    </div>
  );
};

export default CommentElement;
