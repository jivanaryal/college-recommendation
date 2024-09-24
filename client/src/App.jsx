import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleCollegePage from './pages/SingleCollegePage';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
         <Route path="/colleges/:id" element={<SingleCollegePage />} />
      </Routes>
    </Router>
  );
};

export default App;
