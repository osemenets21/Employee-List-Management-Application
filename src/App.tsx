import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { WorkersList } from "./pages/WorkersList/WorkersList";
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/Header/NavBar/NavBar";
import { Login } from "./components/Login/Login";
import { SingUp } from "./components/SingUp/SingUp";
import { FindWorkers } from "./pages/FindWorkers/FindWorkers";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workers-list" element={<WorkersList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sing-up" element={<SingUp />} />
          <Route path="/find-workers" element={<FindWorkers />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
