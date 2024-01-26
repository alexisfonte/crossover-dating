import { useEffect } from "react";
import Match from "./Match";

const MatchList = ({
  user,
  matchUsers,
  setMatchUsers,
  chatContainerRef,
  swipeContainerRef,
  cable,
  showUnreadMessages,
  setShowUnreadMessages,
  setPrevMatchChatDisplay,
  setMatchChatDisplay,
  setRecipient,
  setShowViewedUser,
}) => {
  useEffect(() => {
    if (user.id) {
      cable.subscriptions.create(
        {
          channel: "UserMatchChannel",
          user_id: user.id,
        },
        {
          received: (matchUser) => {
            console.log("match", matchUser)
            setMatchUsers([...matchUsers, matchUser]);
          },
        }
      );
    }
  }, [user.id, setMatchUsers, cable.subscriptions, matchUsers]);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`).then((r) => {
        if (r.ok) {
          r.json().then((data) => setMatchUsers(data));
        }
      });
    }
  }, [user.id, setMatchUsers]);

  return (
    <div className="flex flex-col w-full">
      {matchUsers.map((match) => (
        <Match
          key={match.id}
          user={user}
          chatContainerRef={chatContainerRef}
          swipeContainerRef={swipeContainerRef}
          setShowViewedUser={setShowViewedUser}
          match={match}
          setMatchChatDisplay={setMatchChatDisplay}
          setPrevMatchChatDisplay={setPrevMatchChatDisplay}
          setRecipient={setRecipient}
          showUnreadMessages={showUnreadMessages}
          setShowUnreadMessages={setShowUnreadMessages}
        />
      ))}
    </div>
  );
};
export default MatchList;
