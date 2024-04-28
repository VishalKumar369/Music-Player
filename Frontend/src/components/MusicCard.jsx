import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicCard = ({ imageUrl, songName, artistNames, audioSrc }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="bg-white rounded-2xl shadow-md h-fit">
			<div className="flex flex-col">
				<div className="">
					<img src={imageUrl} alt="Song" className="h-48 w-full rounded-2xl object-fit md:w-48" />
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						{songName}
					</div>
					<a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
						{artistNames}
					</a>
					<button
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						onClick={togglePlayPause}
					>
						{isPlaying ? 'Pause' : 'Play'}
					</button>
					{isPlaying && (
						<ReactAudioPlayer
							src={audioSrc}
							autoPlay
							controls
							onEnded={() => setIsPlaying(false)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default MusicCard;
