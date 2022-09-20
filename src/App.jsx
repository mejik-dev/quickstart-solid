import { Router, Routes, Route } from "@solidjs/router";

import Auth from "./pages/Auth";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
