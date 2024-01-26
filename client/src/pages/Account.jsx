import { useState } from "react"
import NavBar from "../components/NavBar"
import UserProfile from "../components/UserProfile"
import EmailPassword from "../components/EmailPassword"

const Account = ({ user, showAuth, setShowAuth, setIsEditingProfile, setUser, showViewedUser }) => {
    const [showUserProfile, setShowUserProfile] = useState(true)
  return (
    <div className="">
      <NavBar user={user} color={true} showAuth={showAuth} setUser={setUser} />
      <div className="flex justify-between items-start mt-14">
        <div className="py-16 w-1/3 flex flex-col items-start">
          <button className="w-3/4 uppercase text-base m-1.5 py-3 px-8 rounded-md bg-red-300" autoFocus onClick={() => setShowUserProfile(true)}>Profile</button>
          <button className="w-3/4 uppercase text-base m-1.5 py-3 px-8 rounded-md bg-red-300" onClick={() => setShowUserProfile(false)}>Security</button>
        </div>
        <div className="flex justify-center w-2/3">
          {showUserProfile 
          ?
          <UserProfile user={user} setShowAuth={setShowAuth} setIsEditingProfile={setIsEditingProfile} showViewedUser={showViewedUser} />
          :
          <EmailPassword user={user} setUser={setUser} />} 
        </div>               
      </div>
    </div>    
  )
}
export default Account