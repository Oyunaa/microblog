import React, { FormEvent, useState } from 'react';
import { PostService } from '../services/Post.service';

export function NewPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await PostService.createPost({ content, title });
      setShowSuccess(true);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
    }
  };
  return (
    <div>
      <div className="p-2 flex flex-col m-auto w-full lg:w-1/3">
        <h2 className="my-4 text-3xl font-black uppercase">Create new post</h2>

        {errorMessage ? (
          <div className="bg-red-700 text-white p-2"> {errorMessage}</div>
        ) : null}
        {showSuccess ? (
          <div className="bg-green-700 text-white p-2">
            Post created successfully!
          </div>
        ) : null}

        <form className="my-4 p-4 shadow-lg">
          <div>
            <label htmlFor="title">Title: </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              id="title"
            />
          </div>
          <div>
            <label htmlFor="content">Content: </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full"
              id="content"
            ></textarea>
          </div>
          <button
            onClick={createPost}
            className="bg-blue-700 text-white p-2 w-full"
          >
            create post
          </button>
        </form>
      </div>
    </div>
  );
}
