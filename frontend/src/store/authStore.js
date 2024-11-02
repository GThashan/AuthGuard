import { create } from "zustand";
import axios from "axios";

const API_URL =  "https://auth-guard-api.vercel.app/?vercelToolbarCode=xPXiB2_0agnDgFO" ;

axios.defaults.withCredentials = true;

export const useauthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isloading: false,
	isCheckeckingauth: true,
	message: null,

	signUp: async (name,email,password) => {
		set({ isloading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signUp`, { name,email,password });
			set({ user: response.data.user, isAuthenticated: true, isloading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isloading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isloading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isloading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isloading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isloading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isloading: false });
		} catch (error) {
			set({ error: "Error logging out", isloading: false });
			throw error;
		}
	},
	verifyEmail: async (code) => {
		set({ isloading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isloading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isloading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckeckingauth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckeckingauth: false });
		} catch (error) {
			set({ error: null, isCheckeckingauth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		set({ isloading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/resetpassword`, { email });
			set({ message: response.data.message, isloading: false });
		} catch (error) {
			set({
				isloading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isloading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/passwordreset/${token}`, { password });
			set({ message: response.data.message, isloading: false });
		} catch (error) {
			set({
				isloading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
}));