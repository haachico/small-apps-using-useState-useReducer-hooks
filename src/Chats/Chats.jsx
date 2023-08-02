import { useEffect, useState } from "react";
import { fakeFetch } from "../Chats/fakeFetch";

const Chats = () => {
  const [chatsData, setChatsData] = useState([]);
  const getChats = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/userchats");

      setChatsData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      {chatsData.map((chat, i) => (
        <h4 key={chat}>
          {(i + 1) % 2 !== 0 ? "User" : "You"} : {chat}
        </h4>
      ))}
    </div>
  );
};
export default Chats;
