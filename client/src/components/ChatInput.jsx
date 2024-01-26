import { useState } from "react"

const ChatInput = ({ user, recipientId, messages, setMessages }) => {
    const [chatInput, setChatInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (chatInput !== '') {
      fetch(`/api/users/${user.id}/create_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: recipientId,
          content: chatInput
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setChatInput('')
            setMessages([...messages, data])
          })
        }
      })
    }    
  }
  return (
    <div className="">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <textarea 
        className="w-[85%] py-3.5 px-7 mx-2.5 border-2 rounded-lg resize-none focus:outline-none focus:border-blue-200 bg-transparent"
          name="chat_input" 
          value={chatInput}
          rows="2"
          onChange={(e) => setChatInput(e.target.value)} />
        <button className="w-[85%]  py-1.5 bg-[#f7f907] text-black font-bold text-base border-2 border-[#ccc] rounded-md border-box focus:outline-none focus:border-[#20abc6] focus:box-shadow-[#20abc6]">Send</button>
      </form>
    </div>
  )
}
export default ChatInput