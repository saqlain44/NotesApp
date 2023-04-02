import React, { useEffect, useState } from 'react'
import './index.css';
import { StylesProvider } from '@material-ui/core/styles';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { getNotes } from './redux/actions/notes';
import { useDispatch } from "react-redux";


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotesPage from "./components/NotesPage"
import CreatePage from "./components/CreatePage"

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('data')));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes());
  })

  return (
    <StylesProvider injectFirst>
      <Router>
        <Navbar />
        <Home>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/notes" element={<NotesPage />} />

            <Route exact path="/create" element={<CreatePage />} />
            <Route exact path="/login" element={!user ? <Login /> : <NotesPage />} />
            <Route exact path="/signUp" element={!user ? <SignUp /> : <NotesPage />} />
          </Routes>
        </Home>
      </Router>
    </StylesProvider>
  );
}

export default App;
