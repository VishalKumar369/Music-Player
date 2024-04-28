import React, {useState} from 'react';
import axios from "axios";

const AddMusic = () => {
	const [song, setSong] = useState("");
	const [singer, setSinger] = useState("");
	const [musicDirector, setMusicDirector] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [albumName, setAlbumName] = useState("");
	const [songFile, setSongFile] = useState(null);

	const onChange = (e) => {
		const {name, value} = e.target;
		switch (name) {
			case "song":
				setSong(value);
				break;
			case "singer":
				setSinger(value);
				break;
			case "music_director":
				setMusicDirector(value);
				break;
			case "release_date":
				setReleaseDate(value);
				break;
			case "album_name":
				setAlbumName(value);
				break;
			case "song_file":
				setSongFile(e.target.files[0]);
				break;
			default:
				break;
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form data (optional, implement as needed)

		const formData = new FormData();
		formData.append('song', song);
		formData.append('singer', singer);
		formData.append('musicDirector', musicDirector);
		formData.append('releaseDate', releaseDate);
		formData.append('albumName', albumName);

		// Handle file upload (if applicable)
		if (songFile) {
			formData.append('songFile', songFile);
		}

		try {
			const token = localStorage.getItem('accessToken');
			const response = await axios.post('http://10.0.1.211:3000/admin/songs', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization':token
				},
			});
			const data = await response.data;
			console.log(data);
		} catch (error) {
			console.error(error);
			// Handle errors appropriately (e.g., display error message to user)
		}
	};


	return (
		<>
			<div className="bg-black text-white w-screen h-screen flex items-center justify-center">
				<form className="bg-gray-800 shadow-md rounded-lg px-8 py-6 flex flex-col gap-4"
				      onSubmit={handleSubmit}>
					<h2 className="text-xl font-bold text-center mb-4">Add New Music</h2>
					<div className="flex items-center">
						<label htmlFor="song" className="w-1/4 text-sm font-medium">Song:</label>
						<input type="text" id="song" name="song" onChange={onChange}
						       className="w-3/4 shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm p-2.5"
						       required/>
					</div>
					<div className="flex items-center">
						<label htmlFor="singer" className="w-1/4 text-sm font-medium">Singer:</label>
						<input type="text" id="singer" name="singer" onChange={onChange}
						       className="w-3/4 shadow-sm text-black  focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm p-2.5"
						       required/>
					</div>
					<div className="flex items-center">
						<label htmlFor="music_director" className="w-1/4 text-sm font-medium">Music Director:</label>
						<input type="text" id="music_director" name="music_director" onChange={onChange}
						       className="w-3/4 text-black  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm p-2.5"
						       required/>
					</div>
					<div className="flex items-center">
						<label htmlFor="release_date" className="w-1/4 text-sm font-medium">Release Date:</label>
						<input type="text" id="release_date" name="release_date" onChange={onChange}
						       className="w-3/4 text-black  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm p-2.5"
						       required/>
					</div>
					<div className="flex items-center">
						<label htmlFor="album_name" className="w-1/4 text-sm font-medium">Album Name:</label>
						<input type="text" id="album_name" name="album_name" onChange={onChange}
						       className="w-3/4 text-black  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm p-2.5"
						       required/>
					</div>
					<div className="flex items-center">
						<label htmlFor="song_file" className="w-1/4 text-sm font-medium">Song File:</label>
						<input type="file" id="song_file" name="song_file" onChange={onChange}
						       className="w-3/4 text-black  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm p-2.5 text-white"
						       required/>
					</div>
					<button type="submit"
					        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-sm">Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AddMusic;