import { useEffect, useState } from "react";
import ChatList from "./ChatList";

const ChatsList = ({
  user,
  matchUsers,
  setMatchChatDisplay,
  setRecipient,
  cable,
  showUnreadMessages,
  setShowUnreadMessages,
  setPrevMatchChatDisplay,
}) => {
  const [listMessages, setListMessages] = useState([]);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/message_histories`).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setListMessages(data);
            const obj = {};
            data.forEach((listMessage) => {
              obj[listMessage[0].message.pair_id] = true;
            });
            setShowUnreadMessages(obj);
          });
        }
      });
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create(
        {
          channel: "ChatlistsChannel",
          user_id: user.id,
        },
        {
          received: () => {
            fetch(`/api/users/${user.id}/message_histories`).then((r) => {
              if (r.ok) {
                r.json().then((data) => setListMessages(data));
              }
            });
          },
        }
      );
    }
  }, [user.id, setListMessages, cable.subscriptions]);

  return (
    <div className="flex flex-col w-full">
      {listMessages.map((listMessage, index) => {
        return (
          <ChatList
            key={index}
            listMessage={listMessage}
            matchUsers={matchUsers}
            user={user}
            setPrevMatchChatDisplay={setPrevMatchChatDisplay}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages}
            setMatchChatDisplay={setMatchChatDisplay}
            setRecipient={setRecipient}
          />
        );
      })}
    </div>
  );
};
export default ChatsList;
