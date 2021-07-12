import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./features/auth/login";
import { Timeline } from "./features/timeline/timeline";
import { SinglePostPage } from "./features/timeline/singlePostPage";
import { EditPost } from "./features/timeline/editPost";
import { Users } from "./features/users/users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/posts" element={<Timeline />}></Route>
        <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
        <Route path="/editPost/:postId" element={<EditPost />}></Route>
        <Route path="/all-users" element={<Users />}></Route>
      </Routes>
    </div>
  );
}

export default App;
