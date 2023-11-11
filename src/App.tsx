import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { WorkersList } from "./pages/WorkersList/WorkersList";
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./pages/Login/Login";
import { SingUp } from "./pages/SingUp/SingUp";
import { FindWorkers } from "./pages/FindWorkers/FindWorkers";
import { AddWorker } from "./components/AddWorker/AddWorker";

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
          <Route path="/add-worker" element={<AddWorker />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
