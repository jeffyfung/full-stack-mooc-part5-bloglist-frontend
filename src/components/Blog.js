import { useState } from "react"

const Blog = ({ user, blog, updateBlog, handleBlogDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showWhenDetailsVisible = {display: detailsVisible ? '' : 'none'};
  const hideWhenDetailsVisible = {display: detailsVisible ? 'none' : ''}

  const toggleDetailsVisibility = () => setDetailsVisible(!detailsVisible);
  const increaselike = () => updateBlog({_id: blog.id, likes: blog.likes + 1});
  const handleDelete = () => handleBlogDelete(blog);

  const deleteButton = () => (
    <button type="button" onClick={handleDelete}>remove</button>
  );

  return (
    <>
      <div className="blog" style={hideWhenDetailsVisible}>
        <span>
          {blog.title} {blog.author + ' '}
        </span>
        <button type="button" onClick={toggleDetailsVisibility}>view</button>
      </div>

      <div className="blog" style={showWhenDetailsVisible}>
        <span>
          {blog.title} {blog.author + ' '}
        </span>
        <button type="button" onClick={toggleDetailsVisibility}>hide</button>
        <div>link {blog.url}</div>
        <div>
          likes {blog.likes}
          <button type="button" onClick={increaselike}>like</button>
        </div>
        <div>{ blog.user ? 'user ' + blog.user.name : ''}</div>
        { blog.user && blog.user.username === user.username ? deleteButton() : null }
      </div>
    </>
  )
}

export default Blog