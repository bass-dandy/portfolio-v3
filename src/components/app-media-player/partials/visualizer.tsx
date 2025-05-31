import React, {useLayoutEffect} from 'react';
import styles from './visualizer.module.css';

import Visualization from './visualization';

const Visualizer: React.FC<{ audio: HTMLAudioElement | null }> = ({audio}) => {
	const canvas = React.useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		if (audio && canvas.current) {
			const vis = new Visualization(canvas.current, audio);

			const draw = () => {
				if (canvas.current) {
					vis.draw();
				}
				frame = requestAnimationFrame(draw);
			};
			let frame = requestAnimationFrame(draw);

			return () => cancelAnimationFrame(frame);
		}
	}, [audio]);

	return (
		<canvas
			ref={canvas}
			className={styles.canvas}
			width={canvas.current?.clientWidth}
			height={canvas.current?.clientHeight}
		/>
	);
}

export default Visualizer;
