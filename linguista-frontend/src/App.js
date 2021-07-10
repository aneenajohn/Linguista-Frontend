import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./features/auth/login";
import { Timeline } from "./features/timeline/timeline";
import { SinglePostPage } from "./features/timeline/singlePostPage";
import { EditPost } from "./features/timeline/editPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/posts" element={<Timeline />}></Route>
        <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
        <Route path="/editPost/:postId" element={<EditPost />}></Route>
      </Routes>
    </div>
  );
}

export default App;
