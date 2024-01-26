import { useState } from "react";
import MatchList from "./MatchList";
import ChatsList from "./ChatsList";
import Chat from "./Chat";

const ChatContainer = ({
  user,
  matchUsers,
  setMatchUsers,
  cable,
  chatContainerRef,
  swipeContainerRef,
  recipient,
  setRecipient,
  setShowViewedUser,
}) => {
  const [matchChatDisplay, setMatchChatDisplay] = useState(0);
  const [prevMatchChatDisplay, setPrevMatchChatDisplay] = useState(null);
  const [showUnreadMessages, setShowUnreadMessages] = useState({});

  return (
    <div
      className="flex flex-col bg-[#0c0a09] w-1/3 text-left"
      ref={chatContainerRef}
    >
      <div>
        <button
          className="w-1/2 border-r border-b text-lg hover:font-bold active:font-bold"
          onClick={() => setMatchChatDisplay(0)}
        >
          Matches
        </button>
        <button
          className="w-1/2 border-r border-b text-lg hover:font-bold active:font-bold"
          onClick={() => setMatchChatDisplay(1)}
        >
          Chats
        </button>
      </div>
      <div className="flex">
        {matchChatDisplay === 0 && (
          <MatchList
            user={user}
            cable={cable}
            setPrevMatchChatDisplay={setPrevMatchChatDisplay}
            chatContainerRef={chatContainerRef}
            swipeContainerRef={swipeContainerRef}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages}
            matchUsers={matchUsers}
            setMatchUsers={setMatchUsers}
            setShowViewedUser={setShowViewedUser}
            setMatchChatDisplay={setMatchChatDisplay}
            setRecipient={setRecipient}
          />
        )}
        {matchChatDisplay === 1 && (
          <ChatsList
            user={user}
            cable={cable}
            setPrevMatchChatDisplay={setPrevMatchChatDisplay}
            showUnreadMessages={showUnreadMessages}
            setShowUnreadMessages={setShowUnreadMessages}
            matchUsers={matchUsers}
            setMatchChatDisplay={setMatchChatDisplay}
            setRecipient={setRecipient}
          />
        )}
        {matchChatDisplay === 2 && <Chat 
          user={user} 
          prevMatchChatDisplay={prevMatchChatDisplay}
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
          setMatchChatDisplay={setMatchChatDisplay}
          recipient={recipient}
          cable={cable} />}
      </div>
    </div>
  );
};
export default ChatContainer;
