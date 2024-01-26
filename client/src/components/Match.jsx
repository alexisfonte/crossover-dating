import { useEffect, useState } from "react";

const Match = ({
  user,
  match,
  showUnreadMessages,
  setPrevMatchChatDisplay,
  setShowUnreadMessages,
  chatContainerRef,
  swipeContainerRef,
  setMatchChatDisplay,
  setRecipient,
  setShowViewedUser,
}) => {
  const [pairId, setPairId] = useState(null);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/matches/${match.id}`).then((r) => {
        if (r.ok) {
          r.json().then((data) => setPairId(data.pair_id));
        }
      });
    }
  }, [user, match, pairId, setPairId]);

  function handleViewProfileClick() {
    swipeContainerRef.current.classList.toggle("inactive");
    chatContainerRef.current.classList.toggle("active");
    setShowViewedUser(true);
    setRecipient(match);
  }

  function handleSendMessageClick() {
    setShowUnreadMessages({ ...showUnreadMessages, [pairId]: false });
    setPrevMatchChatDisplay(0);
    setMatchChatDisplay(2);
    setRecipient(match);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full">
        <img className="mx-2.5 w-8 h-8 rounded-full" src={match.image_url} alt="profile" />
        <div className="flex flex-col">
          <h3>{match.firstname}</h3>
          <p className="text-gray-200">{match.bio}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <button onClick={handleViewProfileClick} className="w-1/2 bg-white text-black border-l border-b text-base p-1.5">View Profile</button>
        <button onClick={handleSendMessageClick} className="w-1/2 bg-white text-black border-l border-b text-base p-1.5">Messages</button>
      </div>
    </div>
  );
};
export default Match;
