import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { io } from "socket.io-client";

import { useAuth } from "../../context/AuthContext";


const socket = io(
  "http://localhost:5000"
);

const ChatBox = ({
  bookingId,
  receiverId,
}) => {
  const { user } = useAuth();

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  // 🔥 FETCH OLD MESSAGES
  useEffect(() => {
    fetchMessages();
  }, [bookingId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${bookingId}`
      );

      setMessages(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SOCKET LISTENER
  useEffect(() => {
    socket.on(
      "receive-message",
      (message) => {
        if (
          message.booking ===
          bookingId
        ) {
          setMessages((prev) => [
            ...prev,
            message,
          ]);
        }
      }
    );

    return () => {
      socket.off(
        "receive-message"
      );
    };
  }, [bookingId]);

  // 🔥 SEND MESSAGE
  const sendMessage =
    async () => {
      console.log("SEND BUTTON CLICKED");

      if (!text.trim()) return;

      const messageData = {
        sender: user._id,
        receiver: receiverId,
        booking: bookingId,
        text,
      };

      console.log("MESSAGE DATA:", messageData);
     
      try {
        const res =
          await axios.post(
            "http://localhost:5000/api/chat",
            messageData
          );
          
        console.log("MESSAGE SAVED:", res.data);

        socket.emit(
          "send-message",
          res.data
        );

        setText("");

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div style={styles.container}>
      <h2>Chat</h2>

      <div style={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              ...styles.message,
              alignSelf:
                msg.sender ===
                user._id
                  ? "flex-end"
                  : "flex-start",

              background:
                msg.sender ===
                user._id
                  ? "#268426"
                  : "#D2D7DF",

              color:
                msg.sender ===
                user._id
                  ? "#fff"
                  : "#000",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="Type message..."
          style={styles.input}
        />

        <button
          onClick={sendMessage}
          style={styles.button}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  messages: {
    height: "300px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
  },

  button: {
    background: "#0B2C59",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "8px",
  },
};

export default ChatBox;