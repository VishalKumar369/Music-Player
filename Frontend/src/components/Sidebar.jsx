import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal'; // Import Modal component
import axios from 'axios';

const Sidebar = () => {
	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]); // State for search results
	const [openModal, setOpenModal] = useState(false); // State for modal visibility

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSearch = async () => {
		if (search) {
			const response = await axios.get(`http://10.0.1.211:3000/user/search?query=${search}`);
			setSearchResults(response.data.songs); // Assuming "songs" key holds results
		} else {
			setSearchResults([]); // Clear results if search term is empty
		}
		setOpenModal(true); // Open modal after search or clearing results
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<div className="bg-[#202020] rounded-xl">
			<ul className="flex justify-center items-start flex-col p-6 text-white text-xl gap-2">
				<li>Music Player</li>
				<li className="flex items-center justify-center gap-x-2 hover:scale-110 cursor-pointer">
					<HomeIcon />
					Home
				</li>
				<li className="flex items-center justify-center gap-x-2 hover:scale-110 cursor-pointer">
					<SearchIcon />
					<input
						onChange={handleChange}
						name="search"
						placeholder="Search"
						className="bg-transparent"
					/>
					<button onClick={handleSearch} className="bg-transparent text-white">
						Search
					</button>
				</li>
				<li className="flex items-center justify-center gap-x-2 hover:scale-110 cursor-pointer" onClick={logout}>
					Logout
				</li>
			</ul>

			{/* Modal for displaying search results */}
			<Modal open={openModal} onClose={handleCloseModal}>
				<div className="modal-content bg-white p-4 rounded-md">
					{/* Assuming a "song" field in search results for display */}
					<h2>Search Results</h2>
					{searchResults.length > 0 ? (
						<ul>
							{searchResults.map((song) => (
								<li key={song._id} className="mb-2">
									{song.song}
								</li>
							))}
						</ul>
					) : (
						<p>No songs found for your search.</p>
					)}
					<button onClick={handleCloseModal} className="mt-4 p-2 bg-gray-200 rounded-md">
						Close
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default Sidebar;
