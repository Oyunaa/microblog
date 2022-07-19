import React, { useEffect, useState } from 'react';
import { IPost } from '../interfaces/IPost';
import { PostService } from '../services/Post.service';
import { Post } from './Post';

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postsUpdated, setPostsUpdated] = useState<any>(null);

  
  const postsChanged = () => {
    setPostsUpdated(Math.random());
  };

  useEffect(() => {
    PostService.getPosts().then((retrievePosts) => {
   //   console.log(retrievePosts);
      setPosts(retrievePosts);
    });
  }, [postsUpdated]);
  return (
    <div className="p-2 flex flex-col m-auto w-full lg:w-1/3">
      <h2 className="my-4 text-3xl font-black uppercase"> Latest posts</h2>
      {posts.map((post) => (
        <Post post={post} postChanged={postsChanged} key={post.id} />
      ))}
    </div>
  );
}
