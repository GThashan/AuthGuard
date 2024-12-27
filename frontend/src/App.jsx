import { Navigate, Route, Routes } from "react-router-dom";


import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/Dashboard";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./Components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useauthStore } from "./store/authStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useauthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useauthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const { isCheckeckingauth, checkAuth } = useauthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckeckingauth) return <LoadingSpinner />;

	return (
		<div
			className='bg-[url("https://elements-resized.envatousercontent.com/elements-video-cover-images/files/bbde24ab-5a83-4ba9-a022-4368b4f52bd8/inline_image_preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=c8a5000879a479c381c1e9aa72451003442bfb233cd9101659db1bd17040691c")] min-h-screen flex items-center justify-center relative overflow-hidden'
		>
			

			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/> 

				 <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					} 
				/>
				
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;