import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Homestaticpage from './Homestaticpage';
import Login from './Login';
import Newspage from './Newspage';
import Signup from './Signup';
import Saved from './Saved';
import ArticlePage from './articlePage';
import Profile from './Profile'
import EditProfile from '../ProfilePageComponents/EditProfileForm'
export const App = () => {
  
  return (
    <Routes>
        <Route path="/" element={<Homestaticpage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user" element={<Newspage />}></Route>
        <Route path="/saved" element={<Saved />}></Route>
        <Route path="/logout" element={<Homestaticpage logout={true}/>}></Route>
        <Route path ="/user/profile" element = {<Profile />}></Route>
        <Route path = "/user/profile/edit" element = {<EditProfile />}></Route>
        <Route path ="/user/article" element = {<ArticlePage />}></Route>
    </Routes>
  );
}

export default App;