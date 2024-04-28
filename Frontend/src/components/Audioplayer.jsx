import React, {useEffect, useRef, useState} from 'react';
import song1 from '../assets/public/song-1.mp3';
const AudioPlayer = () => {

	const audioRef = useRef(null);
	const [song, setSong] = useState(null);

	const [isPlaying, setIsPlaying] = useState(false);

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div>
			<audio ref={audioRef} src={song1} onEnded={() => setIsPlaying(false)} controls/>
			<button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
		</div>
	);
};

export default AudioPlayer;
