import Image from 'next/image';

import {Button} from '@/components/button';

import type {Song} from '../songs';
import styles from './now-playing.module.css';

type NowPlayingProps = {
	song: Song | null,
	onPlay: () => void;
	onPause: () => void;
	onPlayPrev: () => void;
	onPlayNext: () => void;
	isPaused: boolean;
};

const NowPlaying: React.FC<NowPlayingProps> = ({
	song,
	onPlay,
	onPause,
	onPlayPrev,
	onPlayNext,
	isPaused,
}) => (
	<div className={styles.nowPlaying}>
		{song?.cover ? (
			<Image src={song.cover} alt="" width={80} height={80} />
		) : (
			<Image src="/img/media-player/blank-cd.png" alt="" width={80} height={80} />
		)}
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
						onClick={onPlayPrev}
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
					{isPaused ? (
						<Button
							onClick={onPlay}
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
							onClick={onPause}
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
						onClick={onPlayNext}
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

export default NowPlaying;
