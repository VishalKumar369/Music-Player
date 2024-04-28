import React from 'react';

const MusicCard = ({ imageUrl, songName, artistNames }) => {
	return (
		<div className="bg-white rounded-2xl shadow-md h-fit">
			<div className="flex flex-col">
				<div className="">
					<img src={imageUrl} alt="Song" className="h-48 w-full rounded-2xl object-fit md:w-48"/>
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						{songName}
					</div>
					<a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
						{artistNames}
					</a>
				</div>
			</div>
		</div>
	);
};

export default MusicCard;
