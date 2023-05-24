import logo from './logo.svg';
import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';
import Login from './components/LoginPage';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Profile from './components/Profile';
function App() {
  return (
<>

<NavBar/>

<Routes>
<Route index element={<MainPage />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />

<Route>
          <Route path="/" element={<MainPage />} />
        </Route>

</Routes>


</>
  );
}

export default App;
