import Image from 'next/image';
import React from 'react';
import classnames from 'classnames';

import {download} from '@/util';
import {Button} from '@/components/button';

import type {Song} from '../songs';
import styles from './playlist.module.css';

const ENTER = 13;

type PlaylistProps = {
	songs: Song[];
	onSelectSong: (song: Song) => void,
	onPause: () => void,
	isPaused: boolean;
	nowPlaying: Song | null;
};

const Playlist: React.FC<PlaylistProps> = ({
	songs,
	onSelectSong,
	onPause,
	isPaused,
	nowPlaying,
}) => (
	<div className={styles.wrapper}>
		<table className={styles.playlist}>
			<thead>
				<tr>
					<th>#</th>
					<th className={styles.titleColumn}>
						Title
					</th>
					<th>Length</th>
				</tr>
			</thead>
			<tbody>
				{songs.map((song) => (
					<tr
						key={`${song.artist}/${song.album}/${song.title}`}
						className={classnames(styles.playlistItem, {
							[styles.selected]: song === nowPlaying
						})}
						onDoubleClick={() => onSelectSong(song)}
						onKeyDown={(e) => {
							if (e.keyCode === ENTER) {
								onSelectSong(song);
							}
						}}
						tabIndex={0}
					>
						<td>
							<span className={styles.trackNumber}>
								{song.track}
							</span>
							<div className={styles.trackButtons}>
								{isPaused || song !== nowPlaying ? (
									<Button
										className={styles.trackButton}
										onClick={() => onSelectSong(song)}
										aria-label={`play ${song.title}`}
										tabIndex={-1}
									>
										<Image
											src="/img/media-player/play.svg"
											alt=""
											width={24}
											height={24}
										/>
									</Button>
								) : (
									<Button
										className={styles.trackButton}
										onClick={onPause}
										aria-label={`pause ${song.title}`}
										tabIndex={-1}
									>
										<Image
											src="/img/media-player/pause.svg"
											alt=""
											width={24}
											height={24}
										/>
									</Button>
								) }
								<Button
									className={styles.trackButton}
									onClick={() => download(song.src)}
									aria-label={`download ${song.title}`}
								>
									<Image
										src="/img/media-player/download.svg"
										alt=""
										width={24}
										height={24}
									/>
								</Button>
							</div>
						</td>
						<td className={styles.titleColumn}>
							{song.title}
						</td>
						<td>{song.length}</td>
					</tr>
				)) }
			</tbody>
		</table>
	</div>
);

export default Playlist;
