import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChatHeader = ({
  user,
  chatContainerRef,
  swipeContainerRef,
  setShowAuth,
}) => {
    const menuButtonRef = useRef(null)
    const navigate = useNavigate()
  
    function handleClick() {
      setShowAuth(false)
      navigate('/account')
    }
  
    function handleMatchesChatClick() {
      if (!chatContainerRef.current.classList.value.includes('active')) {
        chatContainerRef.current.classList.toggle('active')
        swipeContainerRef.current.classList.toggle('inactive')
        menuButtonRef.current.classList.toggle('active')
      }
    }
  
    function handleSeeUsersClick() {
      if (swipeContainerRef.current.classList.value.includes('inactive')) {
        swipeContainerRef.current.classList.toggle('inactive')
        chatContainerRef.current.classList.toggle('active')   
        menuButtonRef.current.classList.toggle('active')   
      }
    }
  return (
    <div className="bg-black flex justify-between items-center px-6">
    <div className="flex justify-start items-center">
      <img className="mx-2.5 w-8 h-8 rounded-full" src={user.image_url} alt="profile" onClick={handleClick} />
      <h1 className="">{user.firstname}</h1>    
    </div>
    <div className="flex items-center">
      <div className="flex-col" ref={menuButtonRef}>
        <button 
          id="matches-chat" 
          className="py-2.5 px-1.5 rounded-t-lg border-b hover:bg-gray-900 active:bg-gray-900"
          onClick={handleMatchesChatClick}>
            Matches/Chat
        </button>
        <button 
          id="see-users" 
          className="py-2.5 px-1.5 rounded-t-lg border-b hover:bg-gray-900 active:bg-gray-900"
          onClick={handleSeeUsersClick}>
            See Users
        </button>
      </div>
    </div>
  </div>
  );
};
export default ChatHeader;
