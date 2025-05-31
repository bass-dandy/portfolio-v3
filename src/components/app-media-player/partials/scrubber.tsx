import {useCallback, useEffect, useRef, useState} from 'react';
import classnames from 'classnames';

import {clamp} from '@/util';

import styles from './scrubber.module.css';

function formatTime(seconds: number) {
	const minute = Math.floor(seconds / 60);

	// remaining seconds in this minute, prepended with a 0 if less than 2 digits
	const minuteSeconds = `0${Math.floor(seconds % 60)}`.slice(-2);

	return `${minute}:${minuteSeconds}`;
}

type ScrubberProps = {
	isDisabled: boolean;
	currentTime: number;
	duration: number;
	onSeekEnd: (seekTo: number) => void;
};

const Scrubber: React.FC<ScrubberProps> = ({
	isDisabled,
	currentTime,
	duration,
	onSeekEnd,
}) => {
	const [isSeeking, setIsSeeking] = useState(false);
	const [seekOffset, setSeekOffset] = useState(0);
	const trackRef = useRef<HTMLDivElement | null>(null);

	const seek = useCallback((e: MouseEvent) => {
		if (!trackRef.current) return;

		const rect = trackRef.current.getBoundingClientRect();

		// we want to use global cursor position in case it moves off of the track
		// that means to get the offset we need a global track position as well
		const trackMinX = rect.left;
		const trackMaxX = rect.left + rect.width;

		setSeekOffset(
			clamp(e.clientX, trackMinX, trackMaxX) - trackMinX
		);
	}, []);

	const endSeek = useCallback(() => {
		if (!trackRef.current || !isSeeking) return;

		// get playhead position as a percentage of the track width
		const trackWidth = trackRef.current.getBoundingClientRect().width;
		const seekPercentage = seekOffset / trackWidth;

		document.body.classList.remove(styles.seeking);
		onSeekEnd(seekPercentage * duration);
		setIsSeeking(false);
	}, [isSeeking, duration, onSeekEnd, seekOffset]);

	useEffect(() => {
		window.addEventListener('mousemove', seek);
		window.addEventListener('mouseup', endSeek);

		return () => {
			window.removeEventListener('mousemove', seek);
			window.removeEventListener('mouseup', endSeek);
		};
	}, [seek, endSeek]);

	const playheadPosition = duration > 0 ? `${currentTime / duration * 100}%` : '0%';

	return (
		<div className={styles.scrubber}>
			<div className={styles.time}>
				{formatTime(currentTime)}
			</div>
			<div className={styles.track} ref={trackRef}>
				<div
					className={classnames(styles.playhead, {
						[styles.seeking]: isSeeking,
						[styles.disabled]: isDisabled
					})}
					style={{
						left: isSeeking ? seekOffset : playheadPosition,
					}}
					onMouseDown={isDisabled
						? undefined
						: (e: React.MouseEvent) => {
							// add .seeking to the body since the cursor can easily leave the scrubber
							document.body.classList.add(styles.seeking);
							seek(e.nativeEvent);
							setIsSeeking(true);
						}
					}
				/>
			</div>
			<div className={styles.time}>
				{formatTime(duration)}
			</div>
		</div>
	);
}

export default Scrubber;
