import "../cssfiles/articlePage/discussions.css";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
// import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:5000");

function Discussions(props) {
  const title = props.title;
  const [Discussions, setDiscussions] = useState([]);
  const [message, setMessage] = useState("");
  const username = props.username;
  useEffect(() => {
    const fetchDisussions = () => {
      const newtitle = JSON.stringify(title);
      console.log(title);
      console.log("inside fetch");
      try {
        axios
          .get(`http://localhost:5000/user/article/${title}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("response ====", res);
            setDiscussions(() => {
              console.log(res.data.discussions);
              return res.data.discussions;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchDisussions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (title !== "") {
    socket.emit("discuus_on_article", title);
  }

  const sendMessage = () => {
    console.log("send mess");
    // console.log(message);
    socket.emit("send_message", { message, username, title });
  };

  useEffect(() => {
    socket.on("receve_message", (data) => {
      // console.log("receve  mess");

      setDiscussions((prevMessages) => [
        { message: data.message, username: data.username },
        ...prevMessages,
      ]);
    });
  }, []);

  return (
    <div>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {/* {console.log("arry=" + messageReceived)} */}
      {Discussions.map((msg) => (
        <div>
          <h3>{msg.username}</h3>
          <p key={msg.index}>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Discussions;
