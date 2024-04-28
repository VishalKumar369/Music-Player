import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import MusicCard from "../components/MusicCard.jsx";
import axios from "axios";
import Placeholder from "../assets/Placeholder.jpeg";
import Song1 from '../assets/public/song-1.mp3';
import Song2 from '../assets/public/song-2.mp3';
import Song3 from '../assets/public/song-3.mp3';
import Song4 from '../assets/public/song-4.mp3';
import Song5 from '../assets/public/song-5.mp3';

const Home = () => {
	// Sample list of songs
	const [songs, setSongs] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get('http://10.0.1.211:3000/user/songs', {
				headers: {
					'Authorization': localStorage.getItem('accessToken')
				}
			});

			setSongs(await response.data.songs);
			console.log(response.data.songs);
		}
		fetchData();
	}, []);

	return (
		<div className="bg-black w-full min-h-screen flex">
			<div className="w-1/6 p-4">
				<Sidebar/>
			</div>
			<div className="flex-1 p-4 bg-[#1f1f1f] mt-4 rounded-xl overflow-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{songs.map(song => (
						<MusicCard
							key={song._id}
							imageUrl={Placeholder}
							songName={song.song}
							artistNames={song.singer}
							audioSrc={song.song === 'Song1' ? Song1 : song.song === 'Song-2' ? Song2 : song.song === 'Song-3' ? Song3 : song.song === 'Song4' ? Song4 : Song5}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
