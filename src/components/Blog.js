import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ user, blog, updateBlog, handleBlogDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showWhenDetailsVisible = { display: detailsVisible ? '' : 'none' };
  const hideWhenDetailsVisible = { display: detailsVisible ? 'none' : '' };

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible);
  const increaselike = () => updateBlog({ _id: blog.id, likes: blog.likes + 1 });
  const handleDelete = () => handleBlogDelete(blog);

  const deleteButton = () => (
    <button name="remove" type="button" onClick={handleDelete}>remove</button>
  );

  return (
    <>
      <div className="blog simple" style={hideWhenDetailsVisible}>
        <span>
          {blog.title + ' ' + blog.author}
        </span>
        <button name="view" type="button" onClick={toggleDetailsVisibility}>view</button>
      </div>

      <div className="blog expanded" style={showWhenDetailsVisible}>
        <span>
          {blog.title + ' ' + blog.author}
        </span>
        <button name="hide" type="button" onClick={toggleDetailsVisibility}>hide</button>
        <div>link {blog.url}</div>
        <div>
          likes {blog.likes}
          <button name="like" type="button" onClick={increaselike}>like</button>
        </div>
        <div>{ blog.user ? 'user ' + blog.user.name : ''}</div>
        { blog.user && blog.user.username === user.username ? deleteButton() : null }
      </div>
    </>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired
};

export default Blog;