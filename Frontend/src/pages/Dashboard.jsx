import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import AudioPlayer from "../components/Audioplayer.jsx";

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const [songs, setSongs] = useState([]);
	const [selectedSong, setSelectedSong] = useState(null);

	useEffect(() => {
		// Fetch songs from backend (replace with your actual fetch implementation)
		const token = localStorage.getItem('accessToken');
		fetch('http://10.0.1.211:3000/admin/songs', {
			headers: {
				'Authorization': token
			}

		})
			.then(response => response.json())
			.then(data => setSongs(data.songs));
	}, []);

	const handleSongSelect = (song) => {
		setSelectedSong(song.songFile);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const token = localStorage.getItem('accessToken');
			const response = await axios.get('http://10.0.1.211:3000/admin/users', {
				headers: {
					'Authorization': token,
					"Content-Type": "audio/mpeg",
				},

			});
			setUsers(response.data.user);
		};

		fetchUsers();
	}, []);

	const handleDeleteUser = async (username) => {
		// Confirmation dialog can be added here before proceeding with deletion
		if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
			const token = localStorage.getItem('accessToken');
			try {
				const response = await axios.delete(`http://10.0.1.211:3000/admin/users/${username}`, {
					headers: {
						'Authorization': token
					},
				});
				// Handle successful deletion here (e.g., remove user from state)
				const updatedUsers = users.filter(user => user.username !== username);
				setUsers(updatedUsers);
			} catch (error) {
				// Handle deletion error here (e.g., display error message)
				console.error('Error deleting user:', error);
			}
		}
	};

	const handleDeleteSong = async (songId) => {
		// Confirmation dialog can be added here before proceeding with deletion
		if (window.confirm(`Are you sure you want to delete this song?`)) {
			const token = localStorage.getItem('accessToken');
			try {
				const response = await axios.delete(`http://10.0.1.211:3000/admin/songs/${songId}`, {
					headers: {
						'Authorization': token
					},
				});
				// Handle successful deletion
				const updatedSongs = songs.filter(song => song._id !== songId);
				setSongs(updatedSongs);
				// Clear selected song if deleted song was playing
				if (selectedSong === songId) {
					setSelectedSong(null);
				}
			} catch (error) {
				// Handle deletion error
				console.error('Error deleting song:', error);
			}
		}
	};

	const handleVisibilityToggle = async (songId, isVisible) => {
		const token = localStorage.getItem('accessToken');
		try {
			const response = await axios.put(`http://10.0.1.211:3000/admin/songs/${songId}/visibility`, {
				isVisible: !isVisible // Toggle the visibility
			}, {
				headers: {
					'Authorization': token
				},
			});
			// Update the songs list with the updated visibility
			const updatedSongs = songs.map(song => {
				if (song._id === songId) {
					return {
						...song,
						isVisible: !isVisible
					};
				}
				return song;
			});
			setSongs(updatedSongs);
		} catch (error) {
			console.error('Error toggling visibility:', error);
		}
	};

	return (
		<div className="bg-black w-full min-h-screen flex">
			<div className="w-1/6 p-4">
				<Sidebar />
				<Link to="/admin/addMusic" className="bg-blue-500 text-white p-2 rounded mt-5 my-16">Add Music</Link>
			</div>
			<div className="bg-white w-full rounded-lg shadow-lg p-5 md:p-20 mx-2">
				<h2 className="text-gray-800 text-3xl font-semibold">Users</h2>
				<div className="flex flex-wrap mt-10 ">
					{users.map((user, index) => (
						<div key={index} className="w-full p-3 ">
							<div className="bg-white rounded shadow  p-2 flex justify-between items-center">
								<p className="text-gray-800">{user.username}</p>
								<button
									className="text-red-500 hover:text-red-700 focus:outline-none"
									onClick={() => handleDeleteUser(user._id)}>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>


			<div className="container mx-auto px-4 py-8 text-white">
				<h2 className="text-2xl font-semibold mb-4">Song List</h2>
				<ul className="list-none p-0 m-0">
					{songs.map((song) => (
						<li key={song._id} className="flex justify-between items-center py-2 border-b border-gray-200">
							<div className="flex items-center">
								<span className="mr-4">{song.song} - {song.singer}</span>
							</div>
							<div className="flex">
								<button onClick={() => handleSongSelect(song)}
								        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play
								</button>
								<button onClick={() => handleDeleteSong(song._id)}
								        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete
								</button>
								<button onClick={() => handleVisibilityToggle(song._id, song.isVisible)}
								        className={`bg-${song.isVisible ? 'green' : 'red'}-500 hover:bg-${song.isVisible ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded ml-2`}>
									{song.isVisible ? 'Hide' : 'Show'}
								</button>
							</div>
						</li>
					))}
				</ul>
				{selectedSong && <AudioPlayer src={selectedSong} />}
			</div>
		</div>
	);
};

export default Dashboard;
