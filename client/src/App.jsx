import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Projects from "./pages/Projects.jsx";
import Task from "./pages/Task.jsx";
import Login from "./pages/Login.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Projects /></PrivateRoute>} />
        <Route path="/mytask" element={<PrivateRoute><Task /></PrivateRoute>} />
        {/* other routes go here */}
      </Routes>
    </Router>
  );
}

export default App;
