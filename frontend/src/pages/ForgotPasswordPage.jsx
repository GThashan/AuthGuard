
import { useState } from "react";
import { useauthStore } from "../store/authStore";
import Input from "../Components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isloading, forgotPassword } = useauthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<div
			
			className='max-w-md w-full bg-[#3A3A3B]  rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center text-[#FFC300]'>
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-6 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg bg-[#FFC300]'
							type='submit'
						>
							{isloading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
						</button>
					</form>
				) : (
					<div className='text-center'>
						<div
							
							className='w-16 h-16 bg-[#FFC300] rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<Mail className='h-8 w-8 text-white' />
						</div>
						<p className='text-gray-300 mb-6'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}
			</div>

			<div className='px-8 py-4 bg-[#3A3A3B] flex justify-center'>
				<Link to={"/login"} className='text-sm text-[#FFC300] hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
		</div>
	);
};
export default ForgotPasswordPage;