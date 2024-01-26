import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

function App({ cable }) {
  const [user, setUser] = useState({});
  const [showAuth, setShowAuth] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showViewedUser, setShowViewedUser] = useState(false);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  setUser={setUser}
                  showAuth={showAuth}
                  setShowAuth={setShowAuth}
                />
              }
            />
            <Route
              path="/onboarding"
              element={
                <Onboarding
                  user={user}
                  setUser={setUser}
                  showAuth={showAuth}
                  isEditingProfile={isEditingProfile}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  user={user}
                  setUser={setUser}
                  cable={cable}
                  showAuth={showAuth}
                  setShowAuth={setShowAuth}
                  showViewedUser={showViewedUser}
                  setShowViewedUser={setShowViewedUser}
                />
              }
            />
            <Route
              path="/account"
              element={
                <Account
                  user={user}
                  showViewedUser={showViewedUser}
                  setShowViewedUser={setShowViewedUser}
                  setIsEditingProfile={setIsEditingProfile}
                  showAuth={showAuth}
                  setShowAuth={setShowAuth}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/reset_password/:token"
              element={<h1>Onboarding Page</h1>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
