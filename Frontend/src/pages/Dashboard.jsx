import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Dashboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const token = localStorage.getItem('accessToken');
			const response = await axios.get('http://10.0.1.211:3000/admin/users', {
				headers: {
					'Authorization':token,
					"Content-Type": "audio/mpeg",
				},

			});
			setUsers(response.data.user);
		};

		fetchUsers();
	}, []);

	return (
		<div className="bg-gray-800 h-screen w-screen flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
				<h2 className="text-gray-800 text-3xl font-semibold">Users</h2>
				<div className="flex flex-wrap mt-10">
					{users.map((user, index) => (
						<div key={index} className="w-full p-3">
							<div className="bg-white rounded shadow p-2">
								<p className="text-gray-800">{user.username}</p>
							</div>
						</div>
					))}
				</div>

			</div>

			<Link to="/admin/addMusic" className="bg-blue-500 text-white p-2 rounded mt-5">Add Music</Link>
			<Link to='/admin/getAllMusic' className="bg-blue-500 text-white p-2 rounded mt-5"> Get All Music </Link>
		</div>
	);
};

export default Dashboard;