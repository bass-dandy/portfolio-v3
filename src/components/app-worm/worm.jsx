import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import WormGame from '@bass_dandy/w0rm';
import Controls from './partials/controls';
import styles from './worm.module.css';

const Worm = ({isFocused}) => {
	const [score, setScore] = useState(0);
	const [game, setGame] = useState(null);

	const canvasRef = useRef();

	useLayoutEffect(() => {
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

export default Worm;
