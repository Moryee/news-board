// Styles
import "./index.css";
import './App.css';
import './styles/Navbar.css';
import './styles/Body.css'
import './styles/Form.css'
import './styles/Post.css'
import './styles/Comment.css'
import './styles/Pegination.css'

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

import Navbar from "./components/Navbar";
import { ListPosts, UpdatePost } from "./components/Posts";
import { ListComments, UpdateComment } from "./components/Comments";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <div className="body">
            <Routes>
              {/* Auth */}
              <Route element={<LoginPage />} path="/login" />
              <Route element={<RegisterPage />} path="/register" />

              {/* Posts */}
              <Route element={<HomePage />} path="/" />
              <Route path="/list-posts">
                <Route element={<ListPosts />} path="" />
                <Route element={<ListPosts />} path=":page" />
              </Route>

              <Route element={<PrivateRoute />} path='/update-post/:id'>
                <Route element={<UpdatePost />} path='/update-post/:id' />
              </Route>

              {/* Comments */}
              <Route path="/list-posts/">
                <Route element={<ListComments />} path=":id/comments" />
                <Route element={<ListComments />} path=":id/comments/:page" />
              </Route>

              <Route element={<PrivateRoute />} path='/update-comment/:id'>
                <Route element={<UpdateComment />} path='/update-comment/:id' />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
