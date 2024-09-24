import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCollege from './components/AddCollege';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Admin Panel</h1>
        <Routes>
          <Route path="/add-college" element={<AddCollege />} />
          <Route path="/add-student" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
