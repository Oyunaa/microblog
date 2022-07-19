import { IComment } from '../interfaces/IComment';
export function Comment(props: { comment: IComment }) {
  const { comment } = props;

  return (
    <div className="p-2 my-2">
      <div className="flex gap-2 items-center">
        <img
          alt={comment.user.login}
          src={comment.user.avatar_url}
          className="w-6 rounded-full"
        />

        <strong>{comment.user.login}</strong>
      </div>
      <p className="py-2 text-sm">{comment.text}</p>
    </div>
  );
}
