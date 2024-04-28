import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MusicList = () => {
	const [musics, setMusics] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('accessToken');
			try {
				const response = await axios.get('http://10.0.1.211:3000/admin/songs',{
				headers: {
					'Authorization':token
				}}); // Assuming endpoint for
				// all songs
				const fetchedMusics = response.data;
				setMusics(fetchedMusics);
			} catch (error) {
				console.error(error);
				// Handle errors (e.g., display error message to user)
			}
		};

		fetchData();
	}, []); // Empty dependency array [] ensures fetching happens only once on component mount

	return (
		<div>
			<h2>All Music</h2>
			<ul>
				{musics.map((music) => (
					<li key={music.id}>
						{/* Display music details here (e.g., song title, singer) */}
						{music.song} - {music.singer}
					</li>
				))}
			</ul>
		</div>
	);
};

export default MusicList;
