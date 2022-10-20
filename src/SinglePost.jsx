import { useEffect, useState } from "react";
import fetchPosts from "./api/helpers";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import styles from "./style/SinglePost.css";
import { deletePost } from "./api/auth";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SinglePost({ user }) {
  // use the useParams hook from react-router-dom to read the url :id
  const { id } = useParams();
  const { token } = useAuth();
  const [individualPost, setIndividualPost] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function getPost() {
      const posts = await fetchPosts();

      const [onePost] = posts.filter((post) => {
        return post._id === id;
      });
      console.log(onePost);
      setIndividualPost(onePost);
    }
    getPost();
  }, []);
  console.log("the individualPost is:", individualPost);

  return (
    <div className="singlePost">
      <h4>{individualPost.title}</h4>
      <h3> {individualPost.description}</h3>
      <h3>{individualPost.price}</h3>

      {/* {individualPost.isAuthor ? ( */}
      <button
        onClick={() => {
          navigate(`/`);
          deletePost(individualPost._id, token);
        }}
      >
        Delete Post{" "}
      </button>
      <button
        onClick={() => {
          navigate(`/posts/${individualPost._id}/messages`);
        }}
      >
        Messages
      </button>
    </div>
  );
}
