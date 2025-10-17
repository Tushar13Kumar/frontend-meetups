import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./components/Events";
import Details from "./components/Details";

export default function App() {
  return (
    <Router>
      <main>
       <Routes>
  <Route path="/" element={<Events />} />
  <Route path="/meetups" element={<Events />} />  {/* 👈 Add this */}
  <Route path="/event/:title" element={<Details />} />
</Routes>

      </main>
    </Router>
  );
}
