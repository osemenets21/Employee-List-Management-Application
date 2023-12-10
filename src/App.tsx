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
import { useAuth } from "./hooks/useAuth";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";

function App() {
  const { authUser } = useAuth();

  return (
    <div className="App">
      <Header />
      <main className="content dark:bg-slate-600">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/workers-list"
            element={authUser ? <WorkersList /> : <Navigate to="/login" />}
          />
         
          <Route path="/add-worker" element={authUser ? <AddWorker /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
