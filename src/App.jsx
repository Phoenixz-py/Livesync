// import { useState } from 'react'



// function App() {

//   return (
//     <>
//      Hello world
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to WebSocket server

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("update-text", (newText) => setText(newText));
    return () => socket.off("update-text");
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("send-text", newText);
  };

  return (
    <div>
      <h2>Real-Time Collaborative Editor</h2>
      <textarea value={text} onChange={handleChange} rows="10" cols="50" />
    </div>
  );
}

export default App;
