import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import WeatherSearch from "./components/WeatherSearch";
import { auth } from "./firebaseConfig";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {}
        <Route
          path="/"
          element={user ? <Navigate to="/weather" /> : <Login />}
        />
        {}
        <Route
          path="/weather"
          element={user ? <WeatherSearch /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
