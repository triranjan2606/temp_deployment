import { useState } from "react";
import "leaflet/dist/leaflet.css";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Manage from "./pages/Manage";
import { ToastContainer } from 'react-toastify';
import ManageSingleCase from "./pages/ManageSingleCase";
import Progress from "./pages/Progress";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" Component={LandingPage}>
          <Route
            path="/"
            element={<Navigate to={`/manage`} replace />}
          />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/manage" Component={Manage} />
          <Route path="/managee" Component={ManageSingleCase} />
          <Route path="/progress" Component={Progress} />
        </Route>
      </Routes>
    </div>
    <ToastContainer />
    </>
  );
}

export default App;
