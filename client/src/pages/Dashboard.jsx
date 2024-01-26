import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import NavBar from "../components/NavBar";
import ChatContainer from "../components/ChatContainer";
import UserProfile from "../components/UserProfile";
import TinderCard from "react-tinder-card";
import { cn } from "../lib/utils";
const Dashboard = ({
  user,
  setUser,
  cable,
  showAuth,
  setShowAuth,
  showViewedUser,
  setShowViewedUser,
}) => {
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [matchUsers, setMatchUsers] = useState([]);
  const [recipient, setRecipient] = useState({});
  const chatContainerRef = useRef(null);
  const swipeContainerRef = useRef(null);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gender_identity: user.gender_identity,
          gender_interest: user.gender_interest,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => setCharacters(data));
        }
      });
    }
  }, [user.id, user.gender_identity, user.gender_interest]);

  function swiped(direction, id) {
    setLastDirection(direction);
    setTimeout(() => {
      setLastDirection(null);
    }, 3000);
    if (direction === "right" || direction === "left") {
      fetch("/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          viewed_user_id: id,
          liked: direction === "right" ? true : false,
        }),
      }).then((r) => {
        if (r.ok) {
          fetch(`/api/users/${user.id}`).then((r) => {
            if (r.ok) {
              r.json().then((data) => {
                setMatchUsers(data);
              });
            }
          });
        }
      });
    }
  }

  return (
    <>
      <NavBar
        user={user}
        setUser={setUser}
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        setIsSignUp={() => console.log("cannot sign up here")}
      />
      <div className="flex flex-col mt-14">
        <ChatHeader
          user={user}
          chatContainerRef={chatContainerRef}
          swipeContainerRef={swipeContainerRef}
          setShowAuth={setShowAuth}
        />
        <div className="flex justify-between">
          <ChatContainer
            user={user}
            chatContainerRef={chatContainerRef}
            swipeContainerRef={swipeContainerRef}
            matchUsers={matchUsers}
            setMatchUsers={setMatchUsers}
            cable={cable}
            recipient={recipient}
            setRecipient={setRecipient}
            setShowViewedUser={setShowViewedUser}
          />
          <div className="flex flex-col justify-center items-center h-[85vh] w-[70%]" ref={swipeContainerRef}>
            {showViewedUser ? (
              <UserProfile
                user={recipient}
                showViewedUser={showViewedUser}
                setShowViewedUser={setShowViewedUser}
              />
            ) : (
              <>
                <div className="w-[400px] h-[600px]">
                  {characters.map((character) => (
                    <TinderCard
                      className="swipe"
                      key={character.id}
                      onSwipe={(direction) => swiped(direction, character.id)}
                    >
                      <div className={cn("w-[400px] h-[600px] rounded-md border")}>
                        <h3 className="text-2xl">
                          {character.firstname}
                        </h3>
                      </div>
                    </TinderCard>
                  ))}
                </div>
                {lastDirection ? (
                  <h2 className="swipe-info">You swiped {lastDirection}</h2>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
