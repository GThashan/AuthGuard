import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useauthStore } from "./store/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";

const protectrouters = ({ children }) => {
  const { isAuthenticated, user } = useauthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isverify) {
    return <Navigate to="/email-verify" replace />;
  }
  return children;
};

const rederectauthrize = ({ children }) => {
  const { isAuthenticated, user } = useauthStore();
  if (isAuthenticated && user.isverify) {
    return <Navigate to="/email-verify" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckeckingauth, user } = useauthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Is authenticted", isCheckeckingauth);
  console.log("user", user);

  return (
    <div className="bg-yellow-50 h-[120vh] flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            <protectrouters>
              <Dashboard />
            </protectrouters>
          }
        ></Route>
        <Route
          path="/signUp"
          element={
            <rederectauthrize>
              <SignUp />
            </rederectauthrize>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <rederectauthrize>
              <Login />
            </rederectauthrize>
          }
        ></Route>

        <Route path="/email-verify" element={<EmailVerificationPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
