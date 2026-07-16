import { getPosts } from "../services/post";
import { useAsync } from "../hooks/useAsync";
import { Link } from "react-router-dom";
const PostLists = () => {
  const { loading, error, value: posts } = useAsync(getPosts);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1 className="error-msg">error</h1>;

  return (
    <div>
      <h1>Post Lists</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostLists;
