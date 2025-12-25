import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setChat([...chat, "You: " + input, "Yapper: " + data.reply]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🤖 Yapper</h2>
      {chat.map((c, i) => <div key={i}>{c}</div>)}
      <input
        style={{ marginTop: 10, padding: 5, width: 300 }}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button style={{ marginLeft: 10, padding: 5 }} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
