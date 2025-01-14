import useAuth from "./hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchMessage from "./api/helpers";
import { sendMessage } from "./api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./style/Messages.css";

export default function Messages() {
  const [message, setMessage] = useState({});
  const { id } = useParams();
  const { token } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMessage() {
      const message = await fetchMessage(id);
      setMessage(message);
      console.log("msg is:", message);
    }
    getMessage();
  }, []);

  return (
    <div className="message">
      <h4>{message.content}</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await sendMessage(newMessage, id, token);
          setNewMessage("");

          //   navigate("/");
        }}
      >
        <input
          className="input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Your Message Here"
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
