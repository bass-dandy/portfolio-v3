import React, {useState} from 'react';

import {songs, type Song} from './songs';
import Visualizer from './partials/visualizer';
import NowPlaying from './partials/now-playing';
import Playlist from './partials/playlist';
import Scrubber from './partials/scrubber';

import styles from './media-player.module.css';

export default function MediaPlayer() {
	const [nowPlaying, setNowPlaying] = useState<Song | null>(null);
	const [paused, setPaused] = useState(true);
	const [currentTime, setCurrentTime] = useState(0);

	// usually we would use a ref for this, but since we repeatedly load different media sources into the
	// same <audio> element we want to make sure the UI is reactive to those changes
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

	const selectSong = (song: Song) => {
		return song !== nowPlaying
			? setNowPlaying(song)
			: audio?.play();
	};

	const playPrev = () => {
		const nowPlayingIndex = songs.findIndex((song) => song === nowPlaying);
		if (nowPlayingIndex > 0) {
			setNowPlaying(songs[nowPlayingIndex - 1]);
		} else {
			audio?.load();
		}
	};

	const playNext = () => {
		const nowPlayingIndex = songs.findIndex((song) => song === nowPlaying);
		if (nowPlayingIndex + 1 < songs.length) {
			setNowPlaying(songs[nowPlayingIndex + 1]);
		} else {
			setNowPlaying(null);
			audio?.load();
		}
	};

	return (
		<div className={styles.mediaPlayer}>
			<div className={styles.header}>
				<Visualizer audio={audio} />
				<NowPlaying
					song={nowPlaying}
					onPlay={() => audio?.play()}
					onPause={() => audio?.pause()}
					onPlayPrev={playPrev}
					onPlayNext={playNext}
					isPaused={paused}
				/>
			</div>
			<Scrubber
				isDisabled={!nowPlaying}
				currentTime={currentTime || 0 /* || 0 as this could be NaN */}
				duration={audio?.duration || 0 /* || 0 as this could be NaN */}
				onSeekEnd={(time: number) => {
					if (audio) {
						audio.currentTime = time;
						setCurrentTime(time);
					}
				}}
			/>
			<Playlist
				songs={songs}
				nowPlaying={nowPlaying}
				onSelectSong={selectSong}
				onPause={() => audio?.pause()}
				isPaused={paused}
			/>
			<audio
				src={nowPlaying?.src}
				ref={(e) => setAudio(e)}
				onPlay={() => setPaused(false)}
				onPause={() => setPaused(true)}
				onLoadedData={() => audio?.play()}
				onTimeUpdate={() => setCurrentTime(audio?.currentTime ?? 0)}
				onEnded={playNext}
			/>
		</div>
	);
}
