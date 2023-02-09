import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Homestaticpage from './Homestaticpage';
import Login from './Login';
import Newspage from './Newspage';
import Signup from './Signup';
export const App = () => {
  
  return (
    <Routes>
        <Route path="/" element={<Homestaticpage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user" element={<Newspage />}></Route>
        <Route path="/logout" element={<Homestaticpage logout={true}/>}></Route>
    </Routes>
  );
}

export default App;