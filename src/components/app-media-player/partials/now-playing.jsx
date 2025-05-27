import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

import {Button} from '@/components/button';

import styles from './now-playing.module.css';

export default function NowPlaying(props) {
	const {song} = props;

	return (
		<div className={styles.nowPlaying}>
			<img
				src={song ? song.cover : '/img/media-player/blank-cd.png'}
				className={styles.album}
				alt=""
				width={80}
				height={80}
			/>
			<div className={styles.songInfo}>
				<div className={styles.song}>
					{song ? song.title : 'No Song Playing!'}
				</div>
				<div className={styles.artist}>
					{song ? `${song.artist} - ${song.album}` : 'N/A'}
				</div>
				{ song ? (
					<div className={styles.controls}>
						<Button
							onClick={props.onPlayPrev}
							className={styles.mediaButton}
							aria-label="play previous song"
						>
							<Image
								src="/img/media-player/skip-prev.svg"
								alt=""
								width={24}
								height={24}
							/>
						</Button>
						{ props.paused ? (
							<Button
								onClick={props.onPlay}
								className={styles.mediaButton}
								aria-label="play"
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
								onClick={props.onPause}
								className={styles.mediaButton}
								aria-label="pause"
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
							onClick={props.onPlayNext}
							className={styles.mediaButton}
							aria-label="play next song"
						>
							<Image
								src="/img/media-player/skip-next.svg"
								alt=""
								width={24}
								height={24}
							/>
						</Button>
					</div>
				) : null }
			</div>
		</div>
	);
}

NowPlaying.propTypes = {
	song: PropTypes.shape({
		title: PropTypes.string,
		artist: PropTypes.string
	}),
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onPlayPrev: PropTypes.func.isRequired,
	onPlayNext: PropTypes.func.isRequired,
	paused: PropTypes.bool
};
