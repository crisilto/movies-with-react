import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import "./App.css";
import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Rentals from "./components/rentals";

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;