import React, { useState } from 'react';

const Login = () => {
	// State hooks for login and registration forms
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoginView, setIsLoginView] = useState(true); // Toggle between login and registration views

	// Handle changes to the username and password input fields
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		if (isLoginView) {
			console.log('Login attempted with username:', username, 'and password:', password);
			// Add your login logic or API call here
		} else {
			console.log('Registration attempted with username:', username, 'and password:', password);
			// Add your registration logic or API call here
		}
	};

	// Toggle the view between login and registration
	const toggleView = () => {
		setIsLoginView(!isLoginView);
	};

	return (
		<div className="bg-[#202020] min-h-screen flex flex-col justify-center items-center px-4">
			<div className="w-full max-w-md p-6 bg-black rounded-2xl shadow-xl">
				<h1 className="text-white text-4xl text-center mb-6">{isLoginView ? 'Welcome to Music Player' : 'Register for Music Player'}</h1>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label className="text-white block mb-2">Username</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="p-3 w-full border bg-transparent text-gray-800 rounded-md"
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
					<div>
						<label className="text-white block mb-2">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="p-3 w-full border bg-transparent text-gray-800 rounded"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<button type="submit" className="w-full bg-green-500 text-white py-2 rounded-full">
						{isLoginView ? 'Login' : 'Register'}
					</button>
				</form>
				<button onClick={toggleView} className="mt-4 text-white hover:text-blue-500">
					{isLoginView ? 'Need an account? Register here.' : 'Already have an account? Login here.'}
				</button>
			</div>
		</div>
	);
};

export default Login;
