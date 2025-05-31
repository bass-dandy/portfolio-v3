const cover = '/music/cover.jpg';

export type Song = {
	title: string;
	artist: string;
	album: string;
	length: string;
	track: string;
	src: string;
	cover: string;
};

export const songs: Song[] = [
	{
		title: 'Sunrise Bleeds Across Ocean Waves',
		artist: 'Bass Dandy',
		album: 's/t',
		length: '4:20',
		track: '1',
		src: '/music/01 - Sunrise Bleeds Across Ocean Waves.mp3',
		cover
	},
	{
		title: 'Hajimemashite, Aratamemashite, Bass Dandy Desu',
		artist: 'Bass Dandy',
		album: 's/t',
		length: '1:16',
		track: '2',
		src: '/music/02 - Hajimemashite, Aratamemashite, Bass Dandy Desu.mp3',
		cover
	},
	{
		title: 'Got Damn Phone',
		artist: 'Bass Dandy',
		album: 's/t',
		length: '1:08',
		track: '3',
		src: '/music/03 - Got Damn Phone.mp3',
		cover
	},
	{
		title: 'Hear Me Roar',
		artist: 'Bass Dandy',
		album: 's/t',
		length: '5:02',
		track: '4',
		src: '/music/04 - Hear Me Roar.mp3',
		cover
	}
] as const;

