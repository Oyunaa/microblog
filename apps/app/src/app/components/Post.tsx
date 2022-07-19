import { useState } from 'react';
import { IPost } from '../interfaces/IPost';
import { AuthService } from '../services/Auth.service';
import { PostService } from '../services/Post.service';
import { Comment } from './Comment';

export function Post(props: { post: IPost; postChanged: any }) {
  const { post, postChanged } = props;
  const [newComment, setNewComment] = useState<string>('');
  const [newCommentError, setNewCommentError] = useState<string>('');
  const addNewComment = async () => {
    if (!newComment) {
      return;
    }
    try {
      await PostService.createComment({ text: newComment }, post.id);
    } catch (error: any) {
      setNewCommentError(error.response.data.message);
    }
    postChanged();
    setNewComment('');
  };

  return (
    <article className="my-4 shadow-lg ">
      <div className="p-4">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <div className="py-4 flex items-center gap-2">
          <img
            src={post.user.avatar_url}
            alt={post.user.login}
            className="w-8 rounded-full"
          />
        </div>
        <span>
          by <strong>{[post.user.login]}</strong>
        </span>
      </div>
      <div className="p-4">{post.content}</div>
      {post.comments?.length ? (
        <div className="p-4 bg-gray-50">
          <p className="font-bold">Comments: </p>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : null}
      {AuthService.isUserLoggedIn() ? (
        <>
          {newCommentError ? (
            <div className="bg-red-700 text-white p-2">{newCommentError}</div>
          ) : null}
          <div className="p-4 bg-gray-100 flex items-center gap-2">
            <img
              alt={post.user.login}
              src={post.user.avatar_url}
              className="w-6 rounded-full"
            />
            <input
              className="p-2 border w-full"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button
              onClick={addNewComment}
              className="bg-blue-700 text-white p-2"
            >
              add
            </button>
          </div>
        </>
      ) : null}
    </article>
  );
}
