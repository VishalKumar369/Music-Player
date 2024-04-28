import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

const Register = () => {

		const [username, setUsername] = useState('');
		const [password, setPassword] = useState('');
		const navigate = useNavigate();
		const handleUsernameChange = (event) => {
			setUsername(event.target.value);
		};

		const handlePasswordChange = (event) => {
			setPassword(event.target.value);
		};

		const handleSubmit = (event) => {
			event.preventDefault();
			console.log('Login attempted with username:', username, 'and password', password);
			const registration = async () => {
				const response = await axios.post('http://10.0.1.211:3000/admin/signin', {
					username: username,
					password: password
				});
				const data = await response.data;
				console.log(data);
				localStorage.setItem('accessToken', data.token);
				navigate('/admin/dashboard');
			}
			registration();
		}


		return (
			<div className="bg-[#202020] min-h-screen flex flex-col justify-center items-center px-4">
				<div className="w-full max-w-md p-6 bg-black rounded-2xl shadow-xl">
					<h1 className="text-white text-4xl text-center mb-6">
						Register for Music Player as Admin
					</h1>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label className="text-white block mb-2">Username</label>
							<input
								type="text"
								name="username"
								placeholder="Username"
								className="p-3 w-full border bg-transparent text-white rounded-md"
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
								className="p-3 w-full border bg-transparent text-white rounded "
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						<button type="submit" className="w-full bg-green-500 text-white py-2 rounded-full">
							Register
						</button>
					</form>
					<Link to="/admin/register" className="text-white text-center block mt-4 hover:underline">
						Don't have an account? Register here
					</Link>

				</div>
			</div>
		);
	}
;

export default Register;