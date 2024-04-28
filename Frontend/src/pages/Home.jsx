import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import MusicCard from "../components/MusicCard.jsx";

const Home = () => {
	// Sample list of songs
	const songs = [
		{ id: 1, imageUrl: "https://via.placeholder.com/150", songName: "Lost in the Echo", artistNames: "Linkin Park" },
		{ id: 2, imageUrl: "https://via.placeholder.com/150", songName: "Numb", artistNames: "Linkin Park" },
		// Add more songs as needed
	];

	return (
		<div className="bg-black w-full min-h-screen flex">
			<div className="w-1/6 p-4">
				<Sidebar />
			</div>
			<div className="flex-1 p-4 bg-[#1f1f1f] mt-4 rounded-xl overflow-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{songs.map(song => (
						<MusicCard
							key={song.id}
							imageUrl={song.imageUrl}
							songName={song.songName}
							artistNames={song.artistNames}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
