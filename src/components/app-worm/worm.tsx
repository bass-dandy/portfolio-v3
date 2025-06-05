import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import WormGame from '@bass_dandy/w0rm';
import Controls from './partials/controls';
import styles from './worm.module.css';

export default function Worm({isFocused}: {isFocused: boolean}) {
	const [score, setScore] = useState(0);
	const [game, setGame] = useState<WormGame | null>(null);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		if (!canvasRef.current) return;

		const wormGame = new WormGame(canvasRef.current, setScore)
		wormGame.enableKeyboardControls();
		setGame(wormGame);

		return () => {
			wormGame.destroy();
			setGame(null);
		};
	}, [setScore]);

	useEffect(() => {
		if (!isFocused) {
			game?.pause();
			game?.disableKeyboardControls();
		} else {
			game?.enableKeyboardControls();
		}
	}, [game, isFocused]);

	return (
		<div className={styles.worm}>
			<div className={styles.scoreContainer}>
				Score:
				<div className={styles.score}>
					{score * 100}
				</div>
			</div>
			<canvas
				className={styles.canvas}
				ref={canvasRef}
				width={400}
				height={400}
			/>
			{game ? <Controls game={game} /> : null}
		</div>
	);
}
