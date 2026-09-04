import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ExploreBusiness from "./pages/ExploreBusiness";
import StartBusiness from "./pages/StartBusiness";
import Learn from "./pages/Learn";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExploreBusiness />} />
        <Route path="/start" element={<StartBusiness />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
