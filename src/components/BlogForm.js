const BlogForm = ({ onSubmit, newBlog, handleChange }) => {

  return (
    <>
      <h2>create new</h2>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            title <input type="text" value={newBlog.title} onChange={({ target }) => handleChange({ ...newBlog, title: target.value })}/>
          </div>
          <div>
            author <input type="text" value={newBlog.author} onChange={({ target }) => handleChange({ ...newBlog, author: target.value })}/>
          </div>
          <div>
            url <input type="text" value={newBlog.url} onChange={({ target }) => handleChange({ ...newBlog, url: target.value })}/>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </>
  );
};

export default BlogForm;