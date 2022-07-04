import { IPost } from '../interfaces/IPost';

export function Post(props: { post: IPost; postChanged: any }) {
  const { post, postChanged } = props;

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
      <div className="py-4">{post.content}</div>
    </article>
  );
}
