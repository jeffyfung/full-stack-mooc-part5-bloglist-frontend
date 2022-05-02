import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import Blog from '../components/Blog';

describe('testing <Blog/>', () => {

  let container;
  let updateBlog;

  beforeEach(() => {
    const user = {
      name: 'test user',
      username: 'test username'
    };
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 100,
      user: {
        username: 'test username',
        name: 'test name'
      }
    };
    updateBlog = jest.fn();
    const handleBlogDelete = jest.fn();

    ({ container } = render(<Blog user={user} blog={blog} updateBlog={updateBlog} handleBlogDelete={handleBlogDelete}/>));
  });

  test('renders blog title and author by default, but not url or number likes', () => {
    let simpleView = container.querySelector('.simple');
    expect(simpleView).toHaveTextContent('test title test author');
    let expandedView = container.querySelector('.expanded');
    expect(expandedView).toHaveStyle('display: none');
  });

  test('renders blog title, author, url and number of likes after clicking on button', async () => {
    let user = userEvent.setup();
    let button = screen.getByText('view');
    await user.click(button);

    let simpleView = container.querySelector('.simple');
    expect(simpleView).toHaveStyle('display: none');
    let expandedView = container.querySelector('.expanded');
    expect(expandedView).toHaveTextContent('user test name');
    expect(expandedView).toHaveTextContent('likes 100');
  });

  test('calls updateBlog when like button is clicked', async () => {
    let user = userEvent.setup();
    let button = screen.getByText('like');
    await user.click(button);
    await user.click(button);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});

