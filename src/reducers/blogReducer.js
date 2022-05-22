import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      let newBlog = action.payload;
      return state.concat(newBlog);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    modifyBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload._id) {
          return { ...blog, ...action.payload };
        }
        return blog;
      });
    },
  },
});

export const { appendBlog, setBlogs, removeBlog, modifyBlog } = blogSlice.actions;

const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

const createNewBlog = (blog) => {
  return async (dispatch) => {
    let newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(removeBlog(blog));
  };
};

const updateBlog = (update) => {
  return async (dispatch) => {
    await blogService.update(update);
    dispatch(modifyBlog(update));
  };
};

const bindedActions = {
  initializeBlogs,
  createNewBlog,
  deleteBlog,
  updateBlog,
};
export { bindedActions };

export default blogSlice.reducer;
