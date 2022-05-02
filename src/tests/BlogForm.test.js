import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import BlogForm from '../components/BlogForm';

describe('testing <BlogForm/>', () => {

  let onSubmit;
  let handleChange;
  let newBlog;

  beforeEach(() => {
    onSubmit = jest.fn(e => e.preventDefault());
    handleChange = jest.fn();
    newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url'
    };

    render(<BlogForm onSubmit={onSubmit} handleChange={handleChange} newBlog={newBlog}/>);
  });

  test('onSubmit handler is called when new form is submitted', async () => {
    let user = userEvent.setup();
    let button = screen.getByRole('button', { name: /create/i });
    await user.click(button);

    expect(onSubmit.mock.calls).toHaveLength(1);
  });
});