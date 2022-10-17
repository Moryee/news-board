import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostElement = (props) => {
  const { id, username, title, link, upvotes, created_on } = props.obj;
  const api = useAxios();
  const { isAuthor } = useContext(AuthContext)
  const navigate = useNavigate()

  const deletePost = async () => {
    try {
      await api.delete(`/api/posts/${id}/`);
      navigate(0)
    } catch {
      alert('Something went wrong');
    }
  };

  const upvotePost = async () => {
    try {
      await api.post(`/api/posts/${id}/upvote/`);
      navigate(0)
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <button className='upvote' onClick={upvotePost}>⯅</button>
        <Link className='title'
          to={`/list-posts/${id}/comments`}>
          {title}
        </Link>
        {link &&
        <a className='link' href={link} title={link} target='_blank'>(url)</a>}
        {isAuthor(username) &&
          <div className='dropdown'>
            <span>⠄⠄⠄</span>
            <div className='dropdown-content'>
              <Link className='update'
                to={'/update-post/' + id}>
                Update
              </Link>
              <button className='delete' onClick={deletePost}>
                Delete
              </button>
            </div>
          </div>
        }
      </div>
      <div className='post-footer'>
        {upvotes} · by {username} · {created_on}
      </div>
    </div>
  );
};

export default PostElement;
