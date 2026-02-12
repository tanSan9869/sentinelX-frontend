import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Threats from "./pages/Threats";
import Register from "./pages/Register";
import ProjectPage from "./pages/ProjectPage";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/logs/:projectId" element={<Logs />} />
        <Route path="/threats/:projectId" element={<Threats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
