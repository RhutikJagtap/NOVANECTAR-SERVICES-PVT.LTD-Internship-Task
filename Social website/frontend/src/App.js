import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder components
const Home = () => <div>Home Page</div>;
const Chat = () => <div>Chat Page</div>;
const Communities = () => <div>Communities Page</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Social Website</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/communities" element={<Communities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 