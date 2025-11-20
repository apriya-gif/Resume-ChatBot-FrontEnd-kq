import React from "react";

const Chat = ({ question, setQuestion, answer, handleAsk, loading }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAsk();
  };

  return (
    <div className="chat-box">
      <input
        type="text"
        placeholder="Ask me about my experience..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>
      <div className="response">
        <strong>Response:</strong>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Chat;
