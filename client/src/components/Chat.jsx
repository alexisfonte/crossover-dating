import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";

const Chat = ({
  user,
  recipient,
  cable,
  setMatchChatDisplay,
  showUnreadMessages,
  setShowUnreadMessages,
  prevMatchChatDisplay,
}) => {
  const [messages, setMessages] = useState([]);
  const [pairId, setPairId] = useState(null);
  const endMessageRef = useRef(null);

  useEffect(() => {
    endMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  useEffect(() => {
    return function () {
      if (pairId) {
        setShowUnreadMessages({ ...showUnreadMessages, [pairId]: true });
      }
      fetch("/api/matches", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          viewed_user_id: recipient.id,
          last_read: Date(),
        }),
      });
    };
  }, [user.id, recipient.id, pairId]);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: recipient.id
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            console.log(data)
            setMessages(data);
            setPairId(data[0]?.pair_id);
          });
        }
      });
    }
  }, [user.id, recipient.id, setMessages]);

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create(
        {
          channel: "ChatsChannel",
          user_id: user.id,
          recipient_id: recipient.id,
        },
        {
          received: (message) => {
            setMessages([...messages, message]);
          },
        }
      );
    }
  }, [user.id, cable.subscriptions, recipient.id, setMessages, messages]);
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h3 className="ml-5">{recipient.firstname}</h3>
        <button
          className="hover:text-black"
          onClick={() => setMatchChatDisplay(prevMatchChatDisplay)}
        >
          <CrossCircledIcon className="text-right h-6 w-6"/>
        </button>
      </div>
      <div className="h-[60vh] overflow-y-auto border-t">
        {messages.map((message, index) => {
          return message.sender_id === user.id ? (
            <div className="flex justify-end items-center" key={index}>
              <p className="bg-blue-400 p-2.5 rounded-2xl">{message.content}</p>
              <img className="mx-2.5 w-8 h-8 rounded-full" src={user.image_url} alt="chat-img" />
            </div>
          ) : (
            <div className="flex justify-start items-center" key={index}>
              <img className="mx-2.5 w-8 h-8 rounded-full" src={recipient.image_url} alt="chat-img" />
              <p className="bg-gray-200 text-black p-2.5 rounded-2xl max-w-1/2">{message.content}</p>
            </div>
          );
        })}
        <div ref={endMessageRef} />
      </div>
      <ChatInput
        user={user}
        recipientId={recipient.id}
        messages={messages}
        setMessages={setMessages}
        cable={cable}
      />
    </div>
  );
};
export default Chat;
