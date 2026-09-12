import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ExploreBusiness from "./pages/ExploreBusiness";
import StartBusiness from "./pages/StartBusiness";
import Learn from "./pages/Learn";
import About from "./pages/About";

import RoleSelection from "./pages/auth/RoleSelection";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExploreBusiness />} />
        <Route
          path="/start"
          element={
            <ProtectedRoute allowedRoles={["entrepreneur"]}>
              <StartBusiness />
            </ProtectedRoute>
          }
        />
        <Route path="/learn" element={<Learn />} />
        <Route path="/about" element={<About />} />

        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "50px", textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
