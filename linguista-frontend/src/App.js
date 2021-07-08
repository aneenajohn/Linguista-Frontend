import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {Login} from "./features/auth/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
