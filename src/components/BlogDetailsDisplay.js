import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bindedActions as blogBindedActions } from '../reducers/blogReducer';
import BlogHeader from './BlogHeader';
import CommentForm from './CommentForm';

const BlogDetailsDisplay = ({ updateBlog }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const blogId = useParams().id;

  useEffect(() => {
    dispatch(blogBindedActions.initializeBlogs());
  }, []);

  if (blogs.length === 0) return null;
  const targetBlog = blogs.find((blog) => blog.id === blogId);

  const increaselike = () => updateBlog({ _id: targetBlog.id, likes: targetBlog.likes + 1 });

  const blogDetails = (blog) => (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button name='like' type='button' onClick={increaselike}>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  );

  return (
    <div>
      <BlogHeader />
      {blogDetails(targetBlog)}
      <CommentForm blog={targetBlog} />
    </div>
  );
};

export default BlogDetailsDisplay;
