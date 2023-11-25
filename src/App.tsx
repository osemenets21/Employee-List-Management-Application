import React from "react";
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
import { AddWorker } from "./pages/AddWorker/AddWorker";
import { Header } from "./components/Header/Header";
import WorkersList from "./pages/Workers-list/Workers-list";

function App() {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <div className="App">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/workers-list"
            element={
              isAuthenticated ? <WorkersList /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/add-worker" element={<AddWorker />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
