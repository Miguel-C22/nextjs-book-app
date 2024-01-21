'use client'
import { generateChatResponse } from '@/utils/utils';
import React from 'react';

//**************Chat bot Page*****************

// Define a functional component named ChatBot
function ChatBot() {
  // Use React hooks to manage state variables: text and conversation
  const [text, setText] = React.useState('');
  const [conversation, setConversation] = React.useState([]);
  const [loading, setLoading ] = React.useState(false)

  // Define a function handleSubmit to handle form submissions
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    setLoading(true)
    try {
      // Use the generateChatResponse function to get a response based on the current conversation and user input
      const response = await generateChatResponse([...conversation, { role: 'user', content: text }]);
      setLoading(false)
      // Create a new response object with the role 'assistant' and the generated content
      const newResponse = { role: 'assistant', content: response };

      // Update the conversation state with the user's input and the assistant's response
      setConversation([...conversation, { role: 'user', content: text }, newResponse]);
    } catch (error) {
      // Log an error message if there's an issue getting a chat response
      console.error('Error getting chat response:', error);
    }

    // Clear the text input after submitting the form
    setText('');
  };

  // Render the JSX structure for the ChatBot component
  return (
    <div>
      {/* Create a form with an input field and a submit button */}
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full md:w-auto mx-2 md:mx-20">
        <input
          type="text"
          placeholder="Ask me about any book..."
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
          className="input input-bordered join-item w-full md:w-auto"
        />
        <button className="btn join-item btn btn-active w-full md:w-auto md:flex-shrink-0 mt-0 md:mt-0 md:ml-0">Ask Question</button>
      </div>
      </form>

      {/* Display alternating user and assistant messages with different styles */}
      {conversation.length > 0 && (
        <div>
          {/* Map over the conversation array to render each message */}
          {conversation.map((msg, index) => (
            <div key={index}  className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-inherit' : 'bg-stone-300'}`}>
              {/* Use emoji and message content based on the role of the message */}
              {msg.role === 'user' ? ' 😄 ' : ' 🤖 '}{msg.content}
            </div>
          ))}
        </div>
      )}
        {loading ? <span className="loading loading-spinner loading-lg mt-8"></span> : " "}
    </div>
  );
}

// Export the ChatBot component as the default export of this module
export default ChatBot;