import { useEffect, useState } from "react"

const ChatList = ({ listMessage, matchUsers, user, setMatchChatDisplay, setRecipient, showUnreadMessages, setShowUnreadMessages, setPrevMatchChatDisplay }) => {
    const [lastReadAt, setLastReadAt] = useState('')
    const [pairId, setPairId] = useState(null)
  
    const recipientId = 
      listMessage[0]['message']['sender_id'] === user.id ? 
      listMessage[0]['message']['recipient_id'] : 
      listMessage[0]['message']['sender_id']
  
    const recipient = matchUsers.find((matchUser) => matchUser.id === recipientId)
  
    const newMessages = lastReadAt ? listMessage.filter((message) => message.message.created_at > lastReadAt).length : listMessage.length
    const numberOfUnReadMessages = newMessages === 100 ? "99+" : newMessages
  
    useEffect(() => {
      setPairId(listMessage[0]['message']['pair_id'])
    }, [])
  
    useEffect(() => {
      if (user.id) {
        fetch(`/api/users/${user.id}/matches/${recipientId}`)
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => setLastReadAt(data.last_read))
          }
        })
      }    
    }, [user.id, recipientId, setLastReadAt, listMessage, showUnreadMessages])
  
    function handleClick() {
      setShowUnreadMessages({...showUnreadMessages, [pairId]: false})
      setPrevMatchChatDisplay(1)
      setMatchChatDisplay(2)
      setRecipient(recipient)
    }
    return (
        <button className="flex justify-between items-center border-b border-dashed" onClick={handleClick}>
        <div className="flex flex-start items-center">
          <img src={recipient.image_url} className="mx-2.5 w-8 h-8 rounded-full" alt="profile" />
          <div className="flex flex-col">
            <h3>{recipient.firstname}</h3>
            <p>{listMessage[0]['message']['content']}</p>
          </div>
        </div>
        {showUnreadMessages.hasOwnProperty(pairId) 
        ?
        showUnreadMessages[pairId] && newMessages !== 0 && <p className="unread-messages">{numberOfUnReadMessages}</p>
        :
        <p className="p-2.5 text-center w-10 h-10 bg-red-600 rounded-full mr-5">{numberOfUnReadMessages}</p>
        }           
      </button>
  )
}
export default ChatList