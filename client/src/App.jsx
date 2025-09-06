import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects.jsx";
import Task from "./pages/Task.jsx";


function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/mytask" element={<Task/>} />
        {/* other routes go here */}
      </Routes>
    </Router>
  );
}

export default App;
