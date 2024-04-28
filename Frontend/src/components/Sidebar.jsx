import React from 'react';
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search';

const Sidebar = () => {
	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	}

	return (
		<div className="bg-[#202020]  rounded-xl">
			<ul className="flex justify-center items-start flex-col p-6 text-white text-xl gap-2">
				<li>Music Player</li>
				<li className="flex items-center justify-center gap-x-2 hover:scale-110 cursor-pointer"><HomeIcon />Home</li>
				<li className="flex items-center justify-center gap-x-2 hover:scale-110 cursor-pointer"><SearchIcon /> Search</li>
				<li className="flex items-center justify-center gap-x-2 hover:scale-110 cursor-pointer" onClick={logout}>Logout</li>
			</ul>
		</div>
	);
};

export default Sidebar;