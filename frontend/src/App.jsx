import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import Dashboard from "./pages/Dashboard";
import { useauthStore } from "./store/authStore";
import LoadingSpinner from "./Components/LoadingSpinner";



const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useauthStore();

	if (!isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	if (!user?.isverify) {
		return <Navigate to='/email-verify' replace />;
	}

	return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useauthStore();

	if (isAuthenticated && user?.isverify) {
		return <Navigate to='/' replace />;
	}

	return children;
};




function App() {
  const { isCheckeckingauth, checkAuth , user } = useauthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckeckingauth) return <LoadingSpinner />;

  console.log("Is authenticted", isCheckeckingauth);
  console.log("user", user);

  return (
    <div className="bg-yellow-50 h-[120vh] flex items-center justify-center">
      <Routes>
      <Route
					path='/'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
        <Route
          path="/signUp"
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        ></Route>

        <Route path="/email-verify" element={<EmailVerificationPage />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
