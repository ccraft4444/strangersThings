import { useState } from "react";
import { createPost } from "./api/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import styles from "./style/NewPost.css";

function NewPost() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(token);
        const result = await createPost(title, description, price, token);
        console.log(result);
        navigate("/");
      }}
    >
      <input
        className="npIn"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        className="npIn"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
      />

      <input
        className="npIn"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        placeholder="Price"
      />

      <button>Submit</button>
    </form>
  );
}

export default NewPost;
