import { useState } from "react";
import "leaflet/dist/leaflet.css";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Manage from "./pages/Manage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={LandingPage}>
          <Route
            path="/"
            element={<Navigate to={`/manage`} replace />}
          />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/manage" Component={Manage} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
